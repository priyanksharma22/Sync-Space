# SyncSpace - Room Booking API

SyncSpace is a backend project for a multi-user room booking application, built with Node.js, Express, and MongoDB.  
It provides a complete RESTful API for users to browse and book rooms, and for administrators to manage all system data.

A simple HTML/CSS/JS frontend is included for demonstration and testing purposes.

---

## Features

### User Features (via API)
- **Secure Authentication:** Users can create an account and log in with a secure JWT (JSON Web Token) based system.  
- **View Rooms:** Browse a list of all available rooms, including their capacity and description.  
- **Book a Room:** Users can request to book a room for a specific date and time.  
- **View My Bookings:** A personal dashboard where users can see a list of all their past and present bookings with their current status (Pending, Approved, or Rejected).

### Admin Features (via API)
Includes all user features, plus:  
- **Admin Dashboard:** The demo frontend includes a comprehensive admin panel with a tabbed interface.  
- **Manage All Bookings:** View all user bookings, conveniently sorted into Pending, Approved, and Rejected tabs.  
- **Approve/Reject Bookings:** Admins can approve or reject any pending booking request.  
- **Override Bookings:** Admins can modify any booking’s status (e.g., reject an approved booking to prioritize another).  
- **Add New Rooms:** Admins can easily add new rooms to the system.

---

## Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose (for data modeling and schema validation)  
- **Security:** JSON Web Tokens (JWT) for authentication, bcrypt for password hashing  
- **Demo Frontend:** HTML5, Tailwind CSS, Vanilla JavaScript (with Fetch API calls)

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v14 or higher)  
- npm (Node Package Manager)  
- MongoDB (either a local instance or a MongoDB Atlas cloud database)

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/priyanksharma22/Sync-Space.git
   cd Sync-Space

2. Clone the Repository
 ```bash
git clone https://github.com/priyanksharma22/Sync-Space.git
cd Sync-Space

# Install Backend Dependencies
npm install

# Create Environment File
# Create a file named .env in the root directory and add the following:
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/SyncSpaceDB
JWT_SECRET=a-very-strong-and-secret-key-that-no-one-can-guess
PORT=5000

# Run the Server
npm run dev

