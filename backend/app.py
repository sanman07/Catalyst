from flask import Flask, jsonify, request
import firebase_admin
from flask_cors import CORS
from firebase_admin import credentials, firestore
import requests, random

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize Firebase Admin SDK
cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred)

# Get Firestore database reference
db = firestore.client()

# Fetch and store products from FakeStoreAPI
@app.route('/update-products', methods=['POST'])
def update_products():
    response = requests.get('https://fakestoreapi.com/products?limit=5')
    products = response.json()

    # Filter clothing items as per the frontend logic
    clothing_items = [
        product for product in products
        if (product['category'] in ["men's clothing", "women's clothing"]) and"Fjallraven"not in product['title']
    ]

    for product in clothing_items:
        # Assign a stall number randomly from room numbers (2 or 4)
        stall_no = random.choice([2, 4])
        flag = 'active'if product['id'] % 2 == 0 else'inactive'# Set flag based on product ID# Store product in Firestore, including the category field
        db.collection('products').document(str(product['id'])).set({
            'productId': product['id'],
            'title': product['title'],
            'price': product['price'],
            'size': 'medium',
            'category': product['category'],  # Include the category field'stallNo': stall_no,
            'flag': flag
        })

    return jsonify({"message": "Products updated successfully"}), 200# Endpoint to get all products
@app.route('/get-products', methods=['GET'])
def get_products():
    products_ref = db.collection('products')
    products = [doc.to_dict() for doc in products_ref.stream()]
    return jsonify(products), 200

if __name__ == '__main__':
    app.run(debug=True)
