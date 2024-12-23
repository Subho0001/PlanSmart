from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
from flask import Flask, jsonify, request
from models import Service, User, UserService, db
from routes import register_blueprints, user_bp, service_bp, review_bp, order_bp, transaction_bp
from config import Config
from flask_migrate import Migrate
from flasgger import Swagger
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # React app is running on port 3000 by default

#service(description,address,category_name,price,name)
#user(first_name,last_name=vendor,email,password=string,address,city_town,state,pincode)
#user_services(user_id=email,service_id=new_service_id )
df = pd.read_csv('modified_vendors_data.csv')
SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
API_URL = '/static/swagger.yaml' 
app.config.from_object(Config)
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,  
    API_URL,
    config={  # Swagger UI config overrides
        'app_name': "Swagger application"
    },
    
)

app.register_blueprint(swaggerui_blueprint)

# Initialize database
#db.create_all()
db.init_app(app)
migrate = Migrate(app, db)  # Add Flask-Migrate

@app.route('/api/data', methods=['GET'])
def get_data():
    data = df.to_dict(orient='records')  # Convert DataFrame to list of dictionaries
    return jsonify(data)


    app.run(debug=True)

@app.route('/',methods=['GET'])
def home():
    return 'Hello World !!'

@app.route('/contact', methods=['POST'])
def submit():
    data = request.json
    name = data['name']
    email = data['email']
    message = data['message']
    
    # Compose the email
    msg = MIMEMultipart()
    msg['From'] = "cs24mt009@iitdh.ac.in"  # Use a generic from email
    msg['To'] = "subhradip.palit@gmail.com"  # Replace with the recipient's email
    msg['Subject'] = f"New message from {name}"

    # Body of the email
    body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
    msg.attach(MIMEText(body, 'plain'))

    try:
        # Send the email using the local MTA
        with smtplib.SMTP('localhost') as server:  # Assuming your MTA is listening on localhost
            server.sendmail(msg['From'], msg['To'], msg.as_string())
        
        return jsonify({"message": "Email sent successfully to the owner!"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to send email. Error: {str(e)}"}), 500
    

@app.route('/load-data', methods=['POST'])
def load_data():
    try:
        # Iterate over each row in the DataFrame
        for index, row in df.iterrows():
            # Create a new Service instance
            if 'name' not in row or 'email' not in row:
                continue
            
            # Create the service object
            new_service = Service(
                description=row['Descriptions'],
                location=row['address'],
                services=row['category_name'],
                price=row['price'],
                business_name=row['name']
            )
            db.session.add(new_service)
            db.session.commit()  # Commit to get the service ID for linking

            # Check if the user exists based on user_uid (email)
            existing_user = User.query.filter_by(user_uid=row['email']).first()

            if not existing_user:
                # If city_town is NaN or missing, set a default value
                city_town = row.get('city', 'Unknown')  # Default to 'Unknown' if city is missing
                
                # Create a new User if it doesn't exist
                new_user = User(
                    first_name=row.get('first_name', 'Default'),  # Replace 'Default' as necessary
                    last_name='vendor',  # Set as required
                    user_uid=row['email'],
                    password='string',  # Replace with appropriate logic for passwords
                    address=row['address'],
                    city_town=city_town,  # Ensure city_town is set
                    state=row['state'],
                    pincode=row.get('pincode', '000000')  # Replace '000000' as necessary
                )
                db.session.add(new_user)
                db.session.commit()  # Commit to get the user ID
                user = new_user
            else:
                # If user exists, use the existing user
                user = existing_user

            # Create a UserServices instance to link user and service
            user_service_link = UserService(
                user_uid=user.user_uid,  # Assuming 'user_uid' is the unique identifier
                service_uid=new_service.service_uid  # Assuming 'service_uid' is the primary key of Service
            )
            db.session.add(user_service_link)

        # Commit all changes to the database
        db.session.commit()
        return jsonify({"message": "Data loaded successfully!"}), 200

    except Exception as e:
        db.session.rollback()  # Rollback if there is an error
        print(f"Error occurred: {str(e)}")
        return jsonify({"error": f"Failed to load data. Error: {str(e)}"}), 500

   
# Register blueprints for different routes
# app.register_blueprint(user_bp, url_prefix='/users')
# app.register_blueprint(service_bp, url_prefix='/services')
# app.register_blueprint(review_bp, url_prefix='/reviews')
# app.register_blueprint(order_bp, url_prefix='/orders')
# app.register_blueprint(transaction_bp, url_prefix='/transactions')

register_blueprints(app)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
