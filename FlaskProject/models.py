from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# class User(db.Model):
#     __tablename__ = 'users'
#     user_uid = db.Column(db.String, primary_key=True)
#     first_name = db.Column(db.String(50), nullable=False)
#     last_name = db.Column(db.String(50), nullable=False)
#     password = db.Column(db.String(100), nullable=False)
#     address = db.Column(db.String(255), nullable=False)
#     city_town = db.Column(db.String(100), nullable=False)
#     state = db.Column(db.String(100), nullable=False)
#     pincode = db.Column(db.Integer, nullable=False)
    

#     reviews = db.relationship('Review', backref='user', lazy=True)
#     orders = db.relationship('Order', backref='user', lazy=True)
#     services = db.relationship('UserService', backref='user', lazy=True)


# class Service(db.Model):
#     __tablename__ = 'services'
#     service_uid = db.Column(db.String, primary_key=True)
#     services = db.Column(db.String(255), nullable=False)
#     business_name = db.Column(db.String(255), nullable=False)
#     location = db.Column(db.String(255), nullable=False)
#     price = db.Column(db.Float, nullable=False)

#     reviews = db.relationship('Review', backref='service', lazy=True)
#     orders = db.relationship('OrderService', backref='service', lazy=True)
#     user_services = db.relationship('UserService', backref='service', lazy=True)


# class Review(db.Model):
#     __tablename__ = 'reviews'
#     review_uid = db.Column(db.String, primary_key=True)
#     comment = db.Column(db.Text, nullable=False)
#     rating = db.Column(db.Float, nullable=False)
    
#     user_uid = db.Column(db.String, db.ForeignKey('users.user_uid'), nullable=False)
#     service_uid = db.Column(db.String, db.ForeignKey('services.service_uid'), nullable=False)


# class Order(db.Model):
#     __tablename__ = 'orders'
#     order_uid = db.Column(db.String, primary_key=True)
#     date_time = db.Column(db.DateTime, nullable=False)
#     address = db.Column(db.String(255), nullable=False)
#     city_town = db.Column(db.String(100), nullable=False)
#     state = db.Column(db.String(100), nullable=False)
#     pincode = db.Column(db.Integer, nullable=False)
#     decision = db.Column(db.Boolean, default=False)

#     user_uid = db.Column(db.String, db.ForeignKey('users.user_uid'), nullable=False)
#     order_services = db.relationship('OrderService', backref='order', lazy=True)
#     transactions = db.relationship('Transaction', backref='order', lazy=True)

# class OrderService(db.Model):
#     __tablename__ = 'order_services'
#     order_service_uid = db.Column(db.String, primary_key=True)
#     service_uid = db.Column(db.String, db.ForeignKey('services.service_uid'), nullable=False)
#     order_uid = db.Column(db.String, db.ForeignKey('orders.order_uid'), nullable=False)
#     pack_type = db.Column(db.Boolean, default=False)


# class Transaction(db.Model):
#     __tablename__ = 'transactions'
#     transaction_id = db.Column(db.String, primary_key=True)
#     transaction_type = db.Column(db.String(50), nullable=False)
#     total_price = db.Column(db.Float, nullable=False)
#     status = db.Column(db.Boolean, default=False)
#     transaction_time = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
#     order_uid = db.Column(db.String, db.ForeignKey('orders.order_uid'), nullable=False)


# class UserService(db.Model):
#     __tablename__ = 'user_services'
#     user_service_uid = db.Column(db.String, primary_key=True)
    
#     # Foreign Keys
#     user_uid = db.Column(db.String, db.ForeignKey('users.user_uid'), nullable=False)
#     service_uid = db.Column(db.String, db.ForeignKey('services.service_uid'), nullable=False)

#     # Additional columns
#     review_uid = db.Column(db.String, db.ForeignKey('reviews.review_uid'), nullable=True)


class User(db.Model):
    __tablename__ = 'users'
    user_uid = db.Column(db.String, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city_town = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    pincode = db.Column(db.Integer, nullable=False)
    
    reviews = db.relationship('Review', backref='user', lazy=True)
    orders = db.relationship('Order', backref='user', lazy=True)
    services = db.relationship('UserService', backref='user', lazy=True)

    def as_dict(self):
        return {
            "user_uid": self.user_uid,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "address": self.address,
            "city_town": self.city_town,
            "state": self.state,
            "pincode": self.pincode,
            # You can also include relationships if needed
        }

class Service(db.Model):
    __tablename__ = 'services'
    service_uid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    services = db.Column(db.String(255), nullable=False)
    business_name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=False)

    reviews = db.relationship('Review', backref='service', lazy=True)
    orders = db.relationship('OrderService', backref='service', lazy=True)
    user_services = db.relationship('UserService', backref='service', lazy=True)

    def as_dict(self):
        return {
            "service_uid": self.service_uid,
            "services": self.services,
            "business_name": self.business_name,
            "location": self.location,
            "price": self.price,
            "description":self.description
        }

class Review(db.Model):
    __tablename__ = 'reviews'
    review_uid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    comment = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    
    user_uid = db.Column(db.String, db.ForeignKey('users.user_uid'), nullable=False)
    service_uid = db.Column(db.String, db.ForeignKey('services.service_uid'), nullable=False)

    def as_dict(self):
        return {
            "review_uid": self.review_uid,
            "comment": self.comment,
            "rating": self.rating,
            "user_uid": self.user_uid,
            "service_uid": self.service_uid,
        }

class Order(db.Model):
    __tablename__ = 'orders'
    order_uid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date_time = db.Column(db.DateTime, nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city_town = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    pincode = db.Column(db.Integer, nullable=False)
    decision = db.Column(db.Boolean, default=False)
    request= db.Column(db.String(255), nullable=False)

    user_uid = db.Column(db.String, db.ForeignKey('users.user_uid'), nullable=False)
    order_services = db.relationship('OrderService', backref='order', lazy=True)
    transactions = db.relationship('Transaction', backref='order', lazy=True)

    def as_dict(self):
        return {
            "order_uid": self.order_uid,
            "date_time": self.date_time,
            "address": self.address,
            "city_town": self.city_town,
            "state": self.state,
            "pincode": self.pincode,
            "decision": self.decision,
            "user_uid": self.user_uid,
            "request":self.request
        }

class OrderService(db.Model):
    __tablename__ = 'order_services'
    order_service_uid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    service_uid = db.Column(db.String, db.ForeignKey('services.service_uid'), nullable=False)
    order_uid = db.Column(db.String, db.ForeignKey('orders.order_uid'), nullable=False)
    pack_type = db.Column(db.Boolean, default=False)

    def as_dict(self):
        return {
            "order_service_uid": self.order_service_uid,
            "service_uid": self.service_uid,
            "order_uid": self.order_uid,
            "pack_type": self.pack_type,
        }

class Transaction(db.Model):
    __tablename__ = 'transactions'
    transaction_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    transaction_type = db.Column(db.String(50), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.Boolean, default=False)
    transaction_time = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    order_uid = db.Column(db.String, db.ForeignKey('orders.order_uid'), nullable=False)

    def as_dict(self):
        return {
            "transaction_id": self.transaction_id,
            "transaction_type": self.transaction_type,
            "total_price": self.total_price,
            "status": self.status,
            "transaction_time": self.transaction_time,
            "order_uid": self.order_uid,
        }

class UserService(db.Model):
    __tablename__ = 'user_services'
    user_service_uid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    user_uid = db.Column(db.String, db.ForeignKey('users.user_uid'), nullable=False)
    service_uid = db.Column(db.String, db.ForeignKey('services.service_uid'), nullable=False)
    review_uid = db.Column(db.String, db.ForeignKey('reviews.review_uid'), nullable=True)

    def as_dict(self):
        return {
            "user_service_uid": self.user_service_uid,
            "user_uid": self.user_uid,
            "service_uid": self.service_uid,
            "review_uid": self.review_uid,
        }
