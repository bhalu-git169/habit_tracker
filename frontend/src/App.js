import { useState } from 'react';
import Dashboard from './components/dashboard';
import Statistics from './components/Statistics';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [habits, setHabits] = useState([
    { 
      id: 1, 
      name: "Drink Water", 
      category: 'Health',
      weekData: [true, false, true, false, true, false, false],
      completed: false
    },
    { 
      id: 2, 
      name: "Read Book", 
      category: 'Learning',
      weekData: [true, true, true, false, true, false, false],
      completed: true
    },
    { 
      id: 3, 
      name: "Walk 30 min", 
      category: 'Fitness',
      weekData: [false, true, false, true, false, true, false],
      completed: false
    },
    { 
      id: 4, 
      name: "Meditation", 
      category: 'Mindfulness',
      weekData: [true, false, true, false, false, true, false],
      completed: true
    }
  ]);

  const [username] = useState('User');

  const calculateOverallProgress = () => {
    if (habits.length === 0) return 0;
    
    let totalCompleted = 0;
    let totalPossible = 0;
    
    habits.forEach(habit => {
      totalCompleted += habit.weekData.filter(d => d).length;
      totalPossible += habit.weekData.length;
    });
    
    return Math.round((totalCompleted / totalPossible) * 100);
  };

  const getTodayProgress = () => {
    if (habits.length === 0) return 0;
    const completed = habits.filter(h => h.completed).length;
    return Math.round((completed / habits.length) * 100);
  };

  const overallProgress = calculateOverallProgress();
  const todayProgress = getTodayProgress();

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="app-sidebar">
        <div className="sidebar-header">
          <div className="graduation-cap-icon">🎓</div>
          <h2 className="sidebar-title">Progress</h2>
        </div>

        <div className="sidebar-content">
          {/* User Info Section */}
          <div className="user-info-section">
            <div className="user-avatar">
              <span className="avatar-icon">👤</span>
            </div>
            <div className="user-details">
              <h3 className="user-name">@{username}</h3>
              <p className="user-subtitle">Keep tracking!</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="sidebar-nav">
            <button
              className={`nav-btn ${currentView === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentView('dashboard')}
            >
              <span className="nav-icon">📊</span>
              Dashboard
            </button>
            <button
              className={`nav-btn ${currentView === 'statistics' ? 'active' : ''}`}
              onClick={() => setCurrentView('statistics')}
            >
              <span className="nav-icon">📈</span>
              Statistics
            </button>
          </div>

          {/* Overall Progress Bar */}
          <div className="progress-widget">
            <div className="progress-header">
              <span className="progress-label">Weekly Progress</span>
              <span className="progress-value">{overallProgress}%</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            <p className="progress-description">
              {overallProgress >= 70 ? 'Excellent work! 🎉' : overallProgress >= 40 ? 'Keep it up! 💪' : 'You can do it! 🚀'}
            </p>
          </div>

          {/* Today's Progress */}
          <div className="progress-widget">
            <div className="progress-header">
              <span className="progress-label">Today's Progress</span>
              <span className="progress-value">{todayProgress}%</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill secondary"
                style={{ width: `${todayProgress}%` }}
              ></div>
            </div>
            <p className="progress-description">
              {habits.filter(h => h.completed).length} of {habits.length} habits completed
            </p>
          </div>

          {/* Habit Summary */}
          <div className="habit-summary">
            <h4 className="summary-title">This Week</h4>
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-value">{habits.length}</span>
                <span className="stat-label">Total Habits</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">
                  {habits.reduce((acc, h) => acc + h.weekData.filter(d => d).length, 0)}
                </span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">7</span>
                <span className="stat-label">Days Tracked</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="app-main">
        {currentView === 'dashboard' ? (
          <Dashboard 
            habits={habits} 
            setHabits={setHabits}
            username={username}
          />
        ) : (
          <Statistics habits={habits} />
        )}
      </main>
    </div>
  );
}

export default App;
