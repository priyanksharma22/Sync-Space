# SyncSpace - Room Booking API

SyncSpace is a backend REST API for a multi-user room booking application, built with Node.js, Express, and MongoDB.  
It provides secure endpoints for user registration, login, browsing rooms, and booking available time slots.

This project is backend-only and is meant to be tested using an API client such as Postman.

---

## Features

- Secure user authentication using JSON Web Tokens (JWT)
- Password hashing using bcrypt (no plain text passwords stored)
- View list of available rooms
- Book a room for a specific date and time
- Prevent double-booking using overlap-check logic
- Retrieve all upcoming bookings of the logged-in user

---

## Tech Stack

- Node.js, Express.js  
- MongoDB with Mongoose  
- JWT for authentication  
- bcrypt for password hashing  
- Postman for testing

---

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm
- MongoDB (local or Atlas)
- Postman

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/syncspace-api.git
cd syncspace-api
```

### 2. Install Backend Dependencies
```bash
npm install
```

### 3. Create Environment Variables

Create a `.env` file in the root directory:

```
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PORT=5000
```

### 4. Run the Server
```bash
npm run dev
```

Server will run at:
```
http://localhost:5000
```

---

## API Usage (Postman)

### 1. Register a User
**POST** `/api/auth/register`  
Body (JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### 2. Log In
**POST** `/api/auth/login`  
Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

Copy the token from the response to access protected routes.

---

### 3. Get All Rooms (Protected)
**GET** `/api/rooms`  
Use Bearer Token authorization.

---

### 4. Book a Room (Protected)
**POST** `/api/bookings`  
Body (JSON):
```json
{
  "roomId": "room-id-here",
  "date": "2025-12-01",
  "startTime": "14:00",
  "endTime": "15:00"
}
```

---

### 5. Get My Bookings (Protected)
**GET** `/api/bookings/my-bookings`  
Use Bearer Token authorization.

---
