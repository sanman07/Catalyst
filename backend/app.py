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
@app.route('/request-item', methods=['POST'])
def request_item():
    try:
        data = request.json
        stall_no = data.get('stallNo')
        item_request = data.get('request')

        if not stall_no or not item_request:
            return jsonify({"error": "Invalid input"}), 400# Store the request in the Firestore database under the specific stall number
        db.collection('trial-requests').document(str(stall_no)).set({
            'stallNo': stall_no,
            'request': item_request
        })

        return jsonify({"message": "Request stored successfully"}), 200 
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get-trial-requests', methods=['GET'])
def get_trial_requests():
    try:
        requests_ref = db.collection('trial-requests')
        requests = [doc.to_dict() for doc in requests_ref.stream()]
        return jsonify(requests), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
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

@app.route('/clear-request/<int:stall_no>', methods=['DELETE'])
def clear_request(stall_no):
    try:
        # Delete the document for the given stall number from the 'trial-requests' collection
        doc_ref = db.collection('trial-requests').document(str(stall_no))
        doc = doc_ref.get()
        
        if doc.exists:
            doc_ref.delete()
            return jsonify({"message": f"Request for stall {stall_no} cleared successfully"}), 200
        else:
            return jsonify({"error": "Request not found for this stall number"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)
