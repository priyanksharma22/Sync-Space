# SyncSpace - Room Booking API

SyncSpace is a backend REST API for a multi-user room booking application, built with **Node.js**, **Express**, and **MongoDB**.  
It provides secure APIs for users to browse and book rooms, and for administrators to manage all system data.

This project is **backend-only**. All endpoints can be tested using an API client like **Postman**.

---

## ✨ Features

### 🧑‍💼 User Features (via API)

- **Secure Authentication** → Register & log in using JWT-based authentication  
- **View Rooms** → Fetch all available rooms with capacity & description  
- **Book a Room** → Request a booking for any room with date & time  
- **My Bookings** → View all your own bookings (Pending / Approved / Rejected)

---

### 🛠️ Admin Features (via API)

Admins get everything users get, plus:

- **Manage All Bookings** → View all bookings from all users  
- **Approve/Reject Bookings** → Update booking status  
- **Add Rooms** → Add new rooms into the system  

---

## 🧩 Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB + Mongoose  
- **Security:** JWT Authentication, bcrypt password hashing  
- **API Testing:** Postman  

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

---

### ✅ Prerequisites

Make sure you have:

- Node.js (v14 or higher)  
- npm  
- MongoDB (local or Atlas)  
- Postman  

---

## ⚙️ Installation & Running

### 1. Clone the Repository

```bash
git clone https://github.com/priyanksharma22/Sync-Space.git
cd Sync-Space
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env` file in the project root:

```env
# MongoDB connection string
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/SyncSpaceDB

# JWT secret key
JWT_SECRET=a-very-strong-and-secret-key-that-no-one-can-guess

# Server port
PORT=5000
```

### 4. Run the Server

```bash
npm run dev
```

Your backend will start on:

```
http://localhost:5000
```

---

## 🧪 API Testing (Postman)

Since there is no frontend, use Postman to test the API.

---

### **1. Register a User**

**Method:** POST  
**URL:** `http://localhost:5000/api/auth/register`  

**Body (JSON):**

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "user"
}
```

---

### **2. Log In**

**Method:** POST  
**URL:** `http://localhost:5000/api/auth/login`

**Body (JSON):**

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

Copy the token from this response.

---

### **3. Get All Rooms (Protected Route)**

**Method:** GET  
**URL:** `http://localhost:5000/api/rooms`

**Authorization → Bearer Token:**  
Paste the JWT token you copied from login.

---

(Repeat this process to test all other booking-related endpoints.)

---

## ✔️ Notes

- All protected routes require a valid JWT token  
- Admin-only routes require the `role: "admin"` role  
- Uses middleware for authentication and role-based authorization  

---

## 📌 License

This project is for learning purposes and open for improvements.
