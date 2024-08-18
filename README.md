This project consists of a Flask backend and a Next.js frontend that work together to manage products and handle trial room requests. The application includes user authentication, a product page, and a dashboard for managing trial room requests.

## Prerequisites

Before running the application, ensure that you have the following installed:

- Python 3.x
- Node.js (v14.x or later)
- npm or Yarn
- Firebase account with Firestore and Firebase Authentication enabled

## Backend (Flask)
### 1. Clone the Repository
git clone https://github.com/your-username/your-repo.git
cd your-repo/backend
### 2. Set Up Virtual Environment
bash
Copy code
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
### 3. Run the Flask Server

cd /backend
python3 app.py
The Flask server should now be running on http://127.0.0.1:5000.



Flask API Endpoints
GET /get-products: Fetches the list of products from Firestore.
GET /get-trial-requests: Retrieves all trial requests.
DELETE /clear-request/<stall_no>: Clears the request for the specified stall number.
Frontend (Next.js)



2. Install Dependencies
bash
Copy code
npm install
# or
yarn install
3. Configure Environment Variables
Create a .env.local file in the frontend directory with your Firebase configuration:

NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
4. Run the Next.js Development Server
bash
Copy code
npm run dev
# or
yarn dev
The Next.js app should now be running on http://localhost:3000.

Authentication

You can log in to the application using the following credentials:

Email:test@abc.com
Password:test123
Using the Product Page

The product page displays a list of products fetched from the Flask backend. You can browse through the available products, which are filtered to show only relevant categories.

Using the Dashboard

The dashboard allows you to manage trial room requests:

Room Status: Each room shows its current status (e.g., Available, Occupied).
Room Requests: If a room has a request (e.g., a different size), it will display in the room card.
Clear Request: You can clear a request by clicking the "Clear Request" button, which will remove the request from the room and update the backend.
The dashboard automatically updates with new data from the backend every few seconds.