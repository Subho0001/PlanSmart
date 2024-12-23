# from flask import Blueprint, request, jsonify
# from models import db, User, Service, Review, Order, Transaction

# #home_bp=Blueprint('',__name__)
# user_bp = Blueprint('users', __name__)
# service_bp = Blueprint('services', __name__)
# review_bp = Blueprint('reviews', __name__)
# order_bp = Blueprint('orders', __name__)
# transaction_bp = Blueprint('transactions', __name__)



# # User APIs
# @user_bp.route('/', methods=['POST'])
# def create_user():
#     data = request.json
#     new_user = User(
#         user_uid=data['user_uid'],
#         first_name=data['first_name'],
#         last_name=data['last_name'],
#         password=data['password'],
#         address=data['address'],
#         city_town=data['city_town'],
#         state=data['state'],
#         pincode=data['pincode'],
#         decision=data.get('decision', False)
#     )
#     db.session.add(new_user)
#     db.session.commit()
#     return jsonify({'message': 'User created successfully'}), 201


# @user_bp.route('/', methods=['GET'])
# def get_users():
#     users = User.query.all()
#     return jsonify([user.as_dict() for user in users])


# # Service APIs
# @service_bp.route('/', methods=['POST'])
# def create_service():
#     data = request.json
#     new_service = Service(
#         service_uid=data['service_uid'],
#         services=data['services'],
#         business_name=data['business_name'],
#         location=data['location']
#     )
#     db.session.add(new_service)
#     db.session.commit()
#     return jsonify({'message': 'Service created successfully'}), 201


# @service_bp.route('/', methods=['GET'])
# def get_services():
#     services = Service.query.all()
#     return jsonify([service.as_dict() for service in services])


# # Add similar routes for Review, Order, and Transaction entities.


from flask import Blueprint, request, jsonify
from models import OrderService, UserService, db, User, Service, Review, Order, Transaction
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
#from flask import jsonify
# Define blueprints for each entity
user_bp = Blueprint('users', __name__)
service_bp = Blueprint('services', __name__)
review_bp = Blueprint('reviews', __name__)
order_bp = Blueprint('orders', __name__)
transaction_bp = Blueprint('transactions', __name__)

# User APIs
@user_bp.route('/create', methods=['POST'])
def create_user():
    data = request.json
    try:
        hashed_password = generate_password_hash(data['password'])  # Hash the password
        new_user = User(
            user_uid=data['user_uid'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            password=hashed_password,  # Store hashed password
            address=data['address'],
            city_town=data['city_town'],
            state=data['state'],
            pincode=data['pincode'],
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except SQLAlchemyError as e:
        return jsonify({'error': str(e)}), 500

@user_bp.route('/login', methods=['POST'])
def login_user():
    data = request.json
    user = User.query.filter_by(user_uid=data['user_uid']).first()
    if user and check_password_hash(user.password, data['password']):  # Verify hashed password
        return jsonify({'message': 'Login successful', 'user': user.as_dict()})
    return jsonify({'message': 'Invalid credentials'}), 401

@user_bp.route('/<user_id>', methods=['GET'])
def get_user_details(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify(user.as_dict())
    return jsonify({'message': 'User not found'}), 404


# Service APIs
@service_bp.route('/create/<user_uid>', methods=['POST'])
def create_service(user_uid):
    data = request.json
    try:
        # Create a new Service instance
        new_service = Service(
            services=data['services'],
            business_name=data['business_name'],
            location=data['location'],
            price=data['price']
        )
        db.session.add(new_service)
        db.session.commit()  # Commit to get the service_uid of the new service
        
        # Create a new UserService instance to link user and service
        new_user_service = UserService(
            user_uid=user_uid,
            service_uid=new_service.service_uid  # Link to the new service
        )
        db.session.add(new_user_service)
        db.session.commit()

        return jsonify({'message': 'Service created and linked to user successfully', 'service_uid': new_service.service_uid}), 201

    except SQLAlchemyError as e:
        db.session.rollback()  # Rollback in case of an error
        return jsonify({'error': str(e)}), 500


@service_bp.route('/individual/<service_uid>', methods=['GET'])
def get_individual_service(service_uid):
    service = Service.query.get(service_uid)
    if service:
        return jsonify(service.as_dict())
    return jsonify({'message': 'Service not found'}), 404

@service_bp.route('/<service_name>', methods=['GET'])
def get_service_by_name(service_name):
    services = Service.query.filter_by(services=service_name).all()
    if services:
        result = [{'service_id':service.service_uid,'business_name': service.business_name, 'location': service.location,'price':service.price} for service in services]
        return jsonify(result)
    return jsonify({'message': 'No services found with the given name'}), 404


@service_bp.route('/all', methods=['GET'])
def get_all_services():
    services = Service.query.all()
    return jsonify([service.as_dict() for service in services])

@service_bp.route('/unique', methods=['GET'])
def get_unique_services():
    # Group by the `services` column to get unique services
    unique_services = Service.query.with_entities(Service.service_uid, Service.services).group_by(Service.services).all()
    
    return jsonify([{'service_id': service.service_uid, "service_name": service.services} for service in unique_services])


@service_bp.route('/service_by_id/<user_uid>', methods=['GET'])
def get_user_services(user_uid):
    # Fetch all service_uids related to the user from user_services table
    # data=request.json
    # user_uid=data['user_uid']
    print(user_uid)
    user_services = UserService.query.filter_by(user_uid=user_uid).all()
    print(user_services)
    if not user_services:
        return jsonify({"message": "No services found for this user"}),404
    
    # Fetch details of each service using the service_uid
    service_details = []
    for user_service in user_services:
        service = Service.query.filter_by(service_uid=user_service.service_uid).first()
        if service:
            service_details.append({
                "service_uid": service.service_uid,
                "services": service.services,
                "business_name": service.business_name,
                "location": service.location,
                "price": service.price,
                "description": service.description
            })

    return jsonify(service_details)



# Review APIs
@review_bp.route('/<user_id>', methods=['POST'])
def create_review(user_id):
    data = request.json
    new_review = Review(
        #review_uid=data['review_uid'],
        user_uid=user_id,
        service_uid=data['service_id'],
        comment=data['comment'],
        rating=data['rating']
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify({'message': 'Review created successfully'}), 201

@review_bp.route('/<user_id>/<order_id>', methods=['GET'])
def get_review(user_id, order_id):
    review = Review.query.filter_by(user_uid=user_id, order_uid=order_id).first()
    if review:
        return jsonify(review.as_dict())
    return jsonify({'message': 'Review not found'}), 404

@review_bp.route('/service/<service_uid>', methods=['GET'])
def get_reviews_by_service(service_uid):
    reviews = Review.query.filter_by(service_uid=service_uid).all()
    if not reviews:
        return jsonify({'message': 'No reviews found for this service'}), 404

    # Serialize the review data to JSON
    review_list = [{
        'review_uid': review.review_uid,
        'user_uid': review.user_uid,
        'service_uid': review.service_uid,
        'comment': review.comment,
        'rating': review.rating
    } for review in reviews]

    return jsonify(review_list), 200



@review_bp.route('/rating/<user_id>', methods=['GET'])
def get_user_rating(user_id):
    reviews = Review.query.filter_by(user_uid=user_id).all()
    if reviews:
        avg_rating = sum([review.rating for review in reviews]) / len(reviews)
        return jsonify({'average_rating': avg_rating})
    return jsonify({'message': 'No reviews found for this user'}), 404


# Order APIs
# @order_bp.route('/<user_id>/place', methods=['POST'])
# def place_order(user_id):
#     data = request.json
#     new_order = Order(
#         order_uid=data['order_uid'],
#         user_uid=user_id,
#         service_uid=data['service_uid'],
#         status='Placed',
#         date_time=data['date_time']
#     )
#     db.session.add(new_order)
#     db.session.commit()
#     return jsonify({'message': 'Order placed successfully'}), 201

@order_bp.route('/<user_id>/place', methods=['POST'])
def place_order(user_id):
    data = request.json
    data['date_time'] = datetime.strptime(data['date_time'], "%Y-%m-%d %H:%M:%S")
    
    # Create an Order instance with all necessary fields
    new_order = Order(
        user_uid=user_id,
        date_time=data['date_time'],
        address=data['address'],
        city_town=data['city_town'],
        state=data['state'],
        pincode=data['pincode'],
        request=data['request']
    )
    
    # Add the order to the session and commit it first to get the order_uid
    db.session.add(new_order)
    db.session.commit()  # Commit to generate order_uid for new_order

    # Now new_order.order_uid should have a value
    order_uid = new_order.order_uid  # Retrieve the generated order_uid
    
    # Now, add OrderService instances with the generated order_uid
    for service_data in data.get('services', []):
        new_order_service = OrderService(
            service_uid=service_data['service_uid'],
            order_uid=order_uid,  # Use the retrieved order_uid
            pack_type=service_data.get('pack_type', False)  # Default to False if not provided
        )
        # Add each OrderService instance to the session
        db.session.add(new_order_service)
    
    # Commit the transaction to save OrderService entries
    db.session.commit()
    
    return jsonify({'message': 'Order and associated services placed successfully', 'order_uid': order_uid}), 201

@order_bp.route('/<user_id>/accept', methods=['POST'])
def accept_order(user_id):
    order = Order.query.filter_by(user_uid=user_id, status='Placed').first()
    if order:
        order.status = 'Accepted'
        db.session.commit()
        return jsonify({'message': 'Order accepted successfully'})
    return jsonify({'message': 'Order not found or already accepted'}), 404

@order_bp.route('/<user_id>/payment', methods=['POST'])
def pay_for_order(user_id):
    data = request.json
    
    new_transaction = Transaction(
    #transaction_uid=data['transaction_uid'],
    order_uid=data['order_uid'],
    #user_uid=user_id,
    total_price=data['amount'],
    transaction_type=data['transaction_type']
    #date_time=data['date_time']
    )
    db.session.add(new_transaction)
    db.session.commit()
    return jsonify({'message': 'Payment successful'})
    #return jsonify({'message': 'Order not found or not accepted yet'}), 404

# @order_bp.route('/<user_id>', methods=['GET'])
# def get_user_orders(user_id):
#     orders = Order.query.filter_by(user_uid=user_id).all()
#     return jsonify([order.as_dict() for order in orders])


@order_bp.route('/<user_id>', methods=['GET'])
def get_user_orders(user_id):
    # Fetch orders for the given user
    orders = Order.query.filter_by(user_uid=user_id).all()

    # Construct response data
    orders_data = []
    for order in orders:
        # Use as_dict() to get order details
        order_data = order.as_dict()

        # Fetch associated user_services records for each order
        order_services = OrderService.query.filter_by(order_uid=order.order_uid).all()
        
        # Collect service details for each user_service
        services_data = []
        for user_service in order_services:
            # Fetch the service details using service_id
            service = Service.query.filter_by(service_uid=user_service.service_uid).first()
            if service:
                # Get service details with as_dict()
                service_data = service.as_dict()
                # Add pack_type from user_service to the service data
                service_data["pack_type"] = user_service.pack_type
                services_data.append(service_data)
        
        # Add services data to the order data
        order_data["services"] = services_data
        orders_data.append(order_data)

    return jsonify(orders_data)


@order_bp.route('/<user_id>/address', methods=['POST'])
def update_order_address(user_id):
    data = request.json
    order = Order.query.filter_by(user_uid=user_id, status='Placed').first()
    if order:
        order.address = data['address']
        db.session.commit()
        return jsonify({'message': 'Address updated successfully'})
    return jsonify({'message': 'Order not found'}), 404


# Transaction APIs
@transaction_bp.route('/<order_id>/<user_id>', methods=['GET'])
def get_payment_details(order_id, user_id):
    transaction = Transaction.query.filter_by(order_uid=order_id, user_uid=user_id).first()
    if transaction:
        return jsonify(transaction.as_dict())
    return jsonify({'message': 'Transaction not found'}), 404


# Register blueprints in your app (this goes in your main app file)
def register_blueprints(app):
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(service_bp, url_prefix='/services')
    app.register_blueprint(review_bp, url_prefix='/review')
    app.register_blueprint(order_bp, url_prefix='/order')
    app.register_blueprint(transaction_bp, url_prefix='/transaction')
