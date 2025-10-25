# 🧠 MindTrack - Wellness Habit Tracker

> **Built for Hackarena 2025**

A full-stack habit tracking application that helps users build and maintain healthy habits with progress visualization and analytics.

**🔗 Live Demo:** [https://bhalu-git169.github.io/habit_tracker](https://bhalu-git169.github.io/habit_tracker)


## 🏆 Hackathon Information

**Theme:** [Hackathon Theme - MindTrack – Personal Wellness & Habit Tracker]  
**Date:** October 2025  
**Duration:** [ 48 hours ]  
**Hackathon:** [ Hackarena ]

### 💡 Problem Statement

Many people struggle to maintain consistent healthy habits due to lack of tracking and motivation. MindTrack solves this by providing an intuitive interface for habit tracking with visual progress indicators and analytics to keep users motivated.

### 🎯 Our Solution

MindTrack provides:
- Easy habit creation and tracking
- Visual progress charts and statistics
- Category-based organization
- Streak tracking to maintain motivation
- User-friendly interface for daily check-ins

## 👥 Team

| Name | Role/Contributions | GitHub |
|------|------|--------|
| [Tanbi Ghosh] | [Team Lead / Frontend components ,  styling , UI design ] | [@tanbigh]([https://github.com/Tanbigh]) |
| [Aayushi] | [ Database design , Charts implementation , backend logic ] | [@Aayushi2152]([https://github.com/Aayushi2152]) |
| [Bhalendu Shrivastava] | [ Full-stack development, deployment, API integration ] | [@bhalu-git169](https://github.com/bhalu-git169) |


## ✨ Features

- 🔐 **User Authentication** - Secure JWT-based login and registration
- 📊 **Habit Tracking** - Create and track daily habits across multiple categories
- 📈 **Progress Analytics** - Visualize your progress with interactive charts
- 🎯 **Goal Setting** - Set and monitor weekly habit completion goals
- 📅 **Calendar View** - Track your habit streaks with an intuitive calendar
- 🎨 **Category System** - Organize habits by Health, Mindfulness, Productivity, Learning, Fitness, and Sleep
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🚀 Tech Stack

### Frontend
- **React** - UI framework
- **React Router** - Client-side routing with HashRouter
- **Chart.js** - Data visualization
- **CSS3** - Responsive styling
- **LocalStorage** - Client-side habit data persistence

### Backend
- **Flask** - Python web framework
- **SQLAlchemy** - ORM for database management
- **Flask-JWT-Extended** - JWT authentication
- **Flask-CORS** - Cross-origin resource sharing
- **Flask-Bcrypt** - Password hashing
- **SQLite** - Database

### Deployment
- **Frontend:** GitHub Pages
- **Backend:** Render
- **Version Control:** Git & GitHub

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- npm or yarn
- Git

### Clone Repository
```
git clone https://github.com/bhalu-git169/habit_tracker.git
cd habit_tracker
```

### Backend Setup

1. Navigate to backend directory:
`cd backend`

2. Create virtual environment:
```
python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate
```

3. Install dependencies:
`pip install -r requirements.txt`

4. Create `.env` file:
>FLASK_APP=app.py \
FLASK_ENV=development \
SECRET_KEY=your-secret-key-here \
JWT_SECRET_KEY=your-jwt-secret-key-here \
DATABASE_URL=sqlite:///mindtrack.db \
FRONTEND_URL=http://localhost:3000 

5. Run backend:
`python app.py`

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
`cd frontend`

2. Install dependencies:
`npm install`

3. Create `.env.development` file:
`REACT_APP_API_URL=http://localhost:5000`

4. Run frontend:
`npm start`

Frontend will run on `http://localhost:3000`

## 🌐 Deployment

### Deploy Frontend to GitHub Pages
```
cd frontend
npm run deploy
```

### Deploy Backend to Render
1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables in Render dashboard
4. Deploy with start command: `python app.py`

## 🎨 Project Structure

<img width="328" height="778" alt="Screenshot 2025-10-25 214804" src="https://github.com/user-attachments/assets/8668da54-cdf6-44ba-ad54-44873424acf2" />


## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Users
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `POST /api/users/change-password` - Change password (protected)

## 🎯 Usage

1. **Register/Login** - Create an account or login with existing credentials
2. **Add Habits** - Click "Add Habit" and select a category
3. **Track Progress** - Check off habits as you complete them daily
4. **View Statistics** - Navigate to Statistics to see your progress charts
5. **Monitor Streaks** - Use the calendar view to maintain consistency

## 🛡️ Security Features

- Passwords hashed with bcrypt
- JWT-based authentication
- CORS protection
- Environment variable configuration
- Secure token storage

## 📸 Screenshots

<div align="center">

### Login & Dashboard
<img width="959" height="511" alt="image" src="https://github.com/user-attachments/assets/2d70c3d1-769f-4446-9949-7c5037cb165a" />
<img width="943" height="512" alt="image" src="https://github.com/user-attachments/assets/2f8253c9-9694-4a3b-8d1d-27d98eb33100" />


### Statistics & Add Habit
<img width="942" height="506" alt="image" src="https://github.com/user-attachments/assets/0267c3c2-4a34-408c-a6ca-904f14b1a6f2" />

<img width="942" height="506" alt="image" src="https://github.com/user-attachments/assets/68570dc2-9d44-4490-847b-8dcaa2bcde79" />


</div>

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- React documentation
- Flask documentation
- Chart.js library
- GitHub Pages for hosting
- Render for backend deployment

---

⭐ **Star this repository if you found it helpful!**

