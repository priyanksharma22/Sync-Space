SyncSpace - Room Booking API

SyncSpace is a backend REST API for a multi-user room booking application, built with Node.js, Express, and MongoDB. It provides a complete, secure API for users to browse and book rooms, and for administrators to manage all system data.

This project is a backend-only service. All endpoints are designed to be tested and consumed using an API client like Postman.

✨ Features

🧑‍💼 User Features (via API)

Secure Authentication: Create an account and log in via a secure, JWT (JSON Web Token) based system.

View Rooms: Fetch a list of all available rooms, including their capacity and description.

Book a Room: Submit a request to book a room for a specific date and time.

View "My Bookings": Retrieve a list of all personal bookings with their current status (Pending, Approved, or Rejected).

🛠️ Admin Features (via API)

Includes all user features, plus:

Manage All Bookings: Fetch a complete list of all bookings from all users.

Approve/Reject Bookings: Update the status of any booking (e.g., from "pending" to "approved").

Add New Rooms: Create and add new rooms to the system.

🧩 Tech Stack

Backend: Node.js, Express.js

Database: MongoDB with Mongoose (for data modeling and schema validation)

Security: JSON Web Tokens (JWT) for authentication, bcrypt for password hashing

API Testing: Postman

🚀 Getting Started

To get a local copy up and running, follow these simple steps.

✅ Prerequisites

Node.js (v14 or higher)

npm (Node Package Manager)

MongoDB (either a local instance or a MongoDB Atlas cloud database)

Postman (or any other API client)

⚙️ Installation & Running

Clone the Repository:

git clone [https://github.com/priyanksharma22/Sync-Space.git](https://github.com/priyanksharma22/Sync-Space.git)
cd Sync-Space


Install Backend Dependencies:

npm install


Create Environment File:
Create a file named .env in the root directory and add your secret variables:

# Your MongoDB connection string
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/SyncSpaceDB

# Your secret key for creating JSON Web Tokens
JWT_SECRET=a-very-strong-and-secret-key-that-no-one-can-guess

# The port your server will run on
PORT=5000


Run the Server:

npm run dev


Your backend server will now be running on http://localhost:5000.

🧪 API Testing (Postman)

The server is running, but there is no frontend. You must use a tool like Postman to interact with the API.

1. Register a User

Method: POST

URL: http://localhost:5000/api/auth/register

Body (raw, JSON):

{ "name": "Test User", "email": "test@example.com", "password": "password123", "role": "user" }


2. Log In

Method: POST

URL: http://localhost:5000/api/auth/login

Body (raw, JSON):

{ "email": "test@example.com", "password": "password123" }


Action: Copy the token from the response for the next steps.

3. Get All Rooms (Protected Route)

Method: GET

URL: http://localhost:5000/api/rooms

Authorization Tab:

Type: Bearer Token

Token: Paste the token you copied from logging in.

(You can follow this same pattern to test all other API endpoints for creating and managing bookings.)
