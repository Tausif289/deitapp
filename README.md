🥗 Diet Tracker Web Application

A full-stack Diet & Calorie Tracking Web Application built using the MEAN Stack (MongoDB, Express.js, Angular, Node.js).
The application enables users to monitor daily calorie intake, track physical activity, set fitness goals, and visualize nutritional progress through an interactive dashboard.

🚀 Live Demo

Coming Soon – Deployment in progress

📌 Features
🔐 Authentication & Authorization

JWT-based secure authentication

Protected API routes

Password hashing for security

📊 Personalized Dashboard

Daily calorie intake summary

Goal progress tracking

Net calorie balance (Intake − Burned)

🍽️ Meal Management

Log breakfast, lunch, dinner, snacks

Automatic calorie calculation

Edit & delete entries

Daily history tracking

🏃 Activity Tracking

Log physical activities

Track calories burned

Monitor net daily balance

🎯 Goal Setting

Weight gain / weight loss targets

Dynamic progress monitoring

📈 Data Visualization

Weekly & monthly calorie trend charts

Interactive UI components

👤 Profile Management

Upload profile picture

Update personal details

Account customization

🌗 UI/UX Enhancements

Dark & Light theme toggle

Fully responsive layout (mobile-friendly)

🛠️ Tech Stack
Frontend

Angular

TypeScript

CSS

Backend

Node.js

Express.js

Database

MongoDB

Authentication

JSON Web Tokens (JWT)

External Integration

Nutrition / Food API

🏗️ Architecture Overview
Client (Angular)
      ↓
REST API (Express + Node.js)
      ↓
MongoDB Database

Angular handles UI & state management

Express exposes RESTful APIs

MongoDB stores users, meals, goals & activity logs

📂 Project Structure
diet-tracker/
│
├── client/                # Angular Frontend
│   ├── src/
│   └── angular.json
│
├── server/                # Node.js + Express Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/diet-tracker.git
cd diet-tracker
🔧 Backend Setup
cd server
npm install
npm start

Create a .env file inside the server directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FOOD_API_KEY=your_food_api_key
🎨 Frontend Setup
cd client
npm install
ng serve


📊 API Endpoints (Sample)
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	User login
GET	/api/meals	Get user meals
POST	/api/meals	Add meal
DELETE	/api/meals/:id	Delete meal
POST	/api/activity	Log activity
🧪 Testing

To test backend routes:

Use Postman or Thunder Client

Frontend testing can be done using Angular testing utilities.

📈 Future Improvements

AI-based personalized diet recommendations

Cloud deployment (AWS / Render / Firebase)

Real-time analytics dashboard

PWA support

Weekly meal planner

🎯 Learning Highlights

This project demonstrates:

Full-stack application architecture

RESTful API development

Authentication & route protection

MongoDB schema design

Angular component-based architecture

State management

Secure backend implementation

🤝 Contributing

Contributions are welcome.

Fork the repository

Create a new branch

Commit your changes

Submit a Pull Request

📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Tausif Ansar
Full Stack Developer
