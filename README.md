# 🚚 Transportation Scheduling System

A full-stack **Transportation Scheduling System** that connects users with transporters for managing shipment and transportation requests.

The application provides separate flows for **Users** and **Transporters**, including authentication, shipment creation, transporter-side request management, notifications, image uploads, feedback, and trip-related functionality.

---

## 🌐 Live Demo

**Deployed Application:**
https://transporter-schedular.onrender.com

---

## 📌 Project Overview

The Transportation Scheduling System is a web-based platform designed to simplify transportation and shipment management.

The system has two primary roles:

* 👤 **User**
* 🚛 **Transporter**

### User can:

* Create an account
* Login securely
* Create shipment requests
* Provide shipment details
* Upload shipment images
* Track shipment-related information
* Receive notifications
* Provide feedback and ratings

### Transporter can:

* Create a transporter account
* Login securely
* View shipment requests
* Manage transportation requests
* Update request-related information
* Manage transporter profile

The backend uses **Node.js and Express.js**, while the application uses **EJS server-side templates** for rendering pages. MongoDB is used for persistent data storage.

---

# 🛠️ Tech Stack

## Frontend

* EJS
* HTML
* CSS
* JavaScript
* Server-side rendering

The current implementation uses EJS templates through Express rather than React. The Express application configures EJS as its view engine and serves views from the `views` directory.

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* Express Session
* MongoDB session store using `connect-mongo`
* bcrypt for password hashing

## File Upload

* Multer

## Cloud Storage

* Cloudinary

## Real-Time Communication

* Socket.IO

## Other Technologies

* Axios
* Nodemailer
* CORS
* dotenv
* Nodemon

These dependencies are defined in the project's `package.json`.

---

# ✨ Features

* 👤 User registration and login
* 🚛 Transporter registration and login
* 🔐 Session-based authentication
* 👥 Role-based dashboard access
* 📦 Shipment creation
* 📸 Shipment image upload
* ☁️ Cloudinary image storage
* 📅 Shipment scheduling
* 🔔 Notification management
* ⭐ Feedback and rating system
* 📊 User and transporter dashboards
* 🔄 Real-time communication support
* 🗄️ MongoDB database
* 🌍 Render deployment

---

# 🏗️ Application Architecture

```text
                    ┌─────────────────────┐
                    │       Browser       │
                    │   HTML/CSS/JS/EJS   │
                    └──────────┬──────────┘
                               │
                               │ HTTP Requests
                               ▼
                    ┌─────────────────────┐
                    │    Express.js       │
                    │      Server         │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
       ┌───────────┐     ┌─────────────┐   ┌────────────┐
       │ MongoDB   │     │ Cloudinary  │   │ Socket.IO  │
       │ + Mongoose│     │   Images    │   │ Real-time  │
       └───────────┘     └─────────────┘   └────────────┘
```

---

# 🔐 Authentication Flow

The current application uses **Express Session**, not JWT-based authentication.

The session is stored in MongoDB using `connect-mongo`.

### Login Flow

```text
User enters email/password
          ↓
POST /login
          ↓
Find user/transporter in MongoDB
          ↓
bcrypt.compare()
          ↓
Password verified
          ↓
Create req.session.user
          ↓
Store session in MongoDB
          ↓
Redirect according to role
```

The session stores information such as:

* User ID
* Name
* Email
* Role
* Login status
* Login time

The current implementation redirects users and transporters to different dashboards based on their role.

---

# 🔑 Password Security

Passwords are not stored directly as plain text during signup.

The application uses bcrypt:

```javascript
const hashedPassword = await bcrypt.hash(password, 10);
```

During login, the entered password is compared with the stored hash:

```javascript
const isMatch = await bcrypt.compare(password, user.password);
```

This prevents storing the original password in the database.

---

# 👥 Role-Based Access

The system supports two roles:

```text
User
  ↓
User Dashboard

Transporter
  ↓
Transporter Dashboard
```

The role is stored in the session after successful login.

Protected routes use the `ensureAuthenticated` middleware to verify that a valid logged-in session exists.

---

# 📦 Shipment Creation

Users can create shipment requests by providing:

* Location
* Date and time
* Goods description
* Vehicle type
* Shipment photo

The shipment model stores these values in MongoDB.

### Shipment Flow

```text
User fills shipment form
          ↓
Upload image using Multer
          ↓
Validate shipment data
          ↓
Upload image to Cloudinary
          ↓
Receive Cloudinary secure URL
          ↓
Create Shipment document
          ↓
Save shipment in MongoDB
          ↓
Redirect user
```

The `/shipment` route uses `upload.single('photo')`, uploads the received file to Cloudinary, and saves the resulting `secure_url` in the Shipment document.

---

# 📸 Image Upload

Multer is used to handle multipart form-data and uploaded files.

The current Multer configuration uses disk storage and preserves the original filename.

After receiving the file, the backend uploads it to Cloudinary:

```javascript
result = await cloudinary.uploader.upload(req.file.path);
```

The Cloudinary URL is then stored in MongoDB as the shipment's `photo` field.

---

# ☁️ Cloudinary

Cloudinary is used for cloud-based image storage.

Cloudinary credentials are loaded from environment variables:

```text
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_SECRET_KEY
```

The application stores the Cloudinary `secure_url` instead of storing the image itself inside MongoDB.

---

# 🔔 Notifications

The project contains a Notification model for shipment-related status information.

Supported statuses are:

* `approved`
* `rejected`
* `pending`

Each notification contains:

* Shipment ID
* Status
* Message
* Ride number
* Creation time

The notification schema defines these fields and status values.

---

# ⭐ Feedback and Rating

Users can provide feedback after their transportation experience.

The feedback functionality supports:

* Shipment information
* Ride number
* Rating
* Comments

Ratings are restricted to a valid range of **1 to 5** in the application flow.

---

# ⚡ Real-Time Communication

The project includes **Socket.IO** as a real-time communication layer.

Socket.IO can be used to provide instant communication between the client and server without requiring continuous page refreshes.

This is useful for features such as:

* Shipment status updates
* Notifications
* Transporter/user updates
* Real-time tracking-related functionality

Socket.IO is included as a project dependency.

---

# 🗄️ Database

The application uses **MongoDB** with **Mongoose**.

Important models include:

```text
User
Transporter
Shipment
Notification
Process
```

Mongoose is used to define schemas and interact with MongoDB.

For example, the Shipment schema contains:

```text
location
dateTime
goodsDescription
vehicleType
photo
createdAt
updatedAt
```

The schema also enables Mongoose timestamps.

---

# 🖥️ EJS Server-Side Rendering

The application uses EJS for rendering HTML pages.

Express is configured with:

```javascript
app.set('view engine', 'ejs');
```

and views are loaded from:

```text
views/
```

This means the current implementation is **server-rendered using EJS**, rather than a React SPA.

---

# 🛡️ Authentication Middleware

The project contains an `ensureAuthenticated` middleware.

Its responsibility is to check:

1. Whether a session exists
2. Whether a user exists inside the session
3. Whether the user is marked as logged in

If authentication fails, the user is redirected to the login/home page.

Otherwise, the request continues to the protected route.

---

# 🧩 Important Backend Routes

Some important routes include:

```text
GET  /
GET  /login
GET  /signup

POST /signup
POST /login

GET  /user-dashboard
GET  /transporter-dashboard

GET  /shipment
POST /shipment

POST /update-profile
POST /update-profile_2

GET  /logout

GET  /notification/:id
```

The application defines these routes inside the Express server after establishing the MongoDB connection.

---

# 🔄 MongoDB Connection

The server connects to MongoDB using Mongoose.

The MongoDB URI is loaded from:

```text
MONGO_URI
```

The application also contains connection retry logic.

If the initial MongoDB connection fails, the server waits and attempts the connection again.

---

# 🍪 Session Configuration

Sessions are configured using:

```text
express-session
connect-mongo
```

The session data is stored in MongoDB.

Important session settings include:

* Session secret
* MongoDB session store
* Session TTL
* HTTP-only cookie
* SameSite cookie configuration
* Session expiration

The current MongoStore TTL is configured for 14 days, while the browser cookie has a maximum age of 7 days.

---

# 📁 Project Structure

```text
TSS-Final/
│
├── middleware/
│   └── multer.middleware.js
│
├── models/
│   ├── user.js
│   ├── transporter.js
│   ├── shipment.js
│   ├── notification.js
│   └── process.js
│
├── public/
│   └── static assets
│
├── utils/
│   └── cloudinary.js
│
├── views/
│   ├── index.ejs
│   ├── login.ejs
│   ├── signup.ejs
│   ├── shipment.ejs
│   ├── user-page.ejs
│   ├── transporter-page.ejs
│   └── other EJS templates
│
├── .env
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
├── render.yaml
├── server.js
└── README.md
```

The repository currently contains the `middleware`, `models`, `public`, `utils`, and `views` directories along with `server.js`, Docker configuration, Render configuration and package files.

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/Raghuveer222/TSS-Final.git
```

## 2. Move into the project

```bash
cd TSS-Final
```

## 3. Install dependencies

```bash
npm install
```

## 4. Configure environment variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string

SESSION_SECRET=your_session_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key

PORT=3000
```

Do not commit real credentials to GitHub.

---

# ▶️ Run the Application

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The project defines these commands in `package.json`.

---

# 🌍 Deployment

The application is configured for deployment on Render.

# 🔒 Security Considerations

The project uses several security-related practices:

* Password hashing with bcrypt
* Session-based authentication
* HTTP-only session cookies
* Environment variables for secrets
* Protected routes
* Input validation
* Role-based access

For production improvements, additional measures such as stronger cookie configuration, CSRF protection, rate limiting, stricter validation and security headers can be added.

---

# 🚀 Future Improvements

Possible improvements include:

* React-based frontend migration
* Stronger role-based authorization middleware
* Better shipment ownership validation
* Atomic shipment acceptance to avoid race conditions
* Redis-based caching
* Advanced real-time tracking
* Payment gateway integration
* Better input validation
* Rate limiting
* CSRF protection
* Security headers
* Monitoring and logging
* Better mobile responsiveness

---

# 📚 Learning Outcomes

Through this project, the following concepts can be demonstrated:

* Node.js backend development
* Express.js routing
* MongoDB and Mongoose
* EJS server-side rendering
* Session-based authentication
* Password hashing
* Middleware
* File uploads using Multer
* Cloudinary integration
* Real-time communication with Socket.IO
* REST-style backend routes
* Error handling
* Environment configuration


---

# 👨‍💻 Project

** Goods Transportation Scheduling System**

Built using:

**Node.js + Express.js + EJS + MongoDB + Mongoose + Express Session + Cloudinary + Multer + Socket.IO**

---
