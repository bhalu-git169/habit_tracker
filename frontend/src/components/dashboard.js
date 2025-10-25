import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Statistics from './Statistics';
import './dashboard.css';

const categories = [
  { name: 'Health', icon: '💪', color: '#4CAF50' },
  { name: 'Mindfulness', icon: '🧘', color: '#9C27B0' },
  { name: 'Productivity', icon: '📈', color: '#2196F3' },
  { name: 'Learning', icon: '📚', color: '#FF9800' },
  { name: 'Fitness', icon: '🏃', color: '#F44336' },
  { name: 'Sleep', icon: '😴', color: '#673AB7' }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: '', category: '' });
  const [user, setUser] = useState(null);
  
  // ✅ Load habits from localStorage
  const [habits, setHabits] = useState(() => {
    try {
      const saved = localStorage.getItem('habits');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ✅ Load user from localStorage on mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // ✅ Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Toggle habit completion for today
  const toggleHabit = (id) => {
    setHabits(prev => prev.map(h => 
      h.id === id ? { ...h, completed: !h.completed } : h
    ));
  };

  // Calculate overall progress percentage
  const calculateProgress = () => {
    if (habits.length === 0) return 0;
    const completed = habits.filter(h => h.completed).length;
    return Math.round((completed / habits.length) * 100);
  };

  // Calculate today's progress
  const calculateTodayProgress = () => {
    if (habits.length === 0) return 0;
    const completed = habits.filter(h => h.completed).length;
    return Math.round((completed / habits.length) * 100);
  };

  // Add new habit
  const handleAddHabit = () => {
    if (newHabit.name.trim() && newHabit.category) {
      const newId = habits.length > 0 ? Math.max(...habits.map(h => h.id)) + 1 : 1;
      
      // Add weekData for Statistics compatibility
      const weekData = Array(7).fill(false);
      weekData[new Date().getDay()] = Math.random() > 0.5; // Simulate some data
      
      setHabits([...habits, {
        id: newId,
        name: newHabit.name.trim(),
        category: newHabit.category,
        icon: getCategoryIcon(newHabit.category),
        completed: false,
        weekData: weekData, // Add this for Statistics
        createdAt: new Date().toISOString()
      }]);
      setNewHabit({ name: '', category: '' });
      setShowModal(false);
    }
  };

  // Get category icon
  const getCategoryIcon = (categoryName) => {
    const category = categories.find(c => c.name === categoryName);
    return category ? category.icon : '📌';
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const progress = calculateProgress();
  const todayProgress = calculateTodayProgress();

  // ✅ Show Statistics view with habits passed as prop
  if (currentView === 'statistics') {
    return <Statistics habits={habits} onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="dashboard-container">
      {/* ✅ Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-icon">🎓</span>
          <span>Progress</span>
        </div>

        {/* ✅ User Profile */}
        <div className="user-profile">
          <div className="user-avatar">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.username} />
            ) : (
              <span>👤</span>
            )}
          </div>
          <div className="user-info">
            <h3>@{user?.username || 'User'}</h3>
            <p>Keep tracking!</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="sidebar-nav">
          <button 
            className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setCurrentView('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={`nav-item ${currentView === 'statistics' ? 'active' : ''}`}
            onClick={() => setCurrentView('statistics')}
          >
            📈 Statistics
          </button>
        </div>

        {/* Progress Cards */}
        <div className="progress-card">
          <div className="progress-header">
            <strong>Weekly Progress</strong>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="progress-message">Keep it up! 💪</p>
        </div>

        <div className="progress-card">
          <div className="progress-header">
            <strong>Today's Progress</strong>
            <span>{todayProgress}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${todayProgress}%` }}
            />
          </div>
          <p className="progress-message">Half way there! ☀️</p>
        </div>

        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {/* ✅ Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="main-header">
          <h1>MindTrack - Wellness Tracker</h1>
          <div className="profile-icon">
            <span className="profile-placeholder">👤</span>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="welcome-message">
          <h2>Hello, @{user?.username || 'User'}!</h2>
        </div>

        {/* Add Habit Section */}
        <div className="add-habit-section">
          <input 
            type="text" 
            placeholder="Add a habit..."
            className="habit-input"
            onFocus={() => setShowModal(true)}
            readOnly
          />
          <button 
            className="add-habit-btn"
            onClick={() => setShowModal(true)}
          >
            Add Habit
          </button>
        </div>

        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-header">
            <span>Progress:</span>
            <span className="progress-percentage">{progress}% complete</span>
          </div>
          <div className="progress-bar-main">
            <div 
              className="progress-fill-main" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="motivational-message">
          <p>"Keep going! You're doing great today!"</p>
        </div>

        {/* Today's Habits */}
        <div className="habits-section">
          <h2>Today's Habits:</h2>
          {habits.length > 0 ? (
            <div className="habits-list">
              {habits.map(habit => (
                <div key={habit.id} className="habit-item">
                  <input 
                    type="checkbox" 
                    checked={habit.completed}
                    onChange={() => toggleHabit(habit.id)}
                    className="habit-checkbox"
                  />
                  <span className={`habit-name ${habit.completed ? 'completed' : ''}`}>
                    {habit.icon} {habit.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p>No habits yet. Click "Add Habit" to get started!</p>
          )}
        </div>
      </div>

      {/* Add Habit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Habit</h2>
            
            <div className="form-group">
              <label>Habit Name</label>
              <input 
                type="text"
                placeholder="e.g., Drink 8 glasses of water"
                value={newHabit.name}
                onChange={(e) => setNewHabit({...newHabit, name: e.target.value})}
                className="modal-input"
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <div className="category-grid">
                {categories.map(category => (
                  <div
                    key={category.name}
                    className={`category-card ${newHabit.category === category.name ? 'selected' : ''}`}
                    onClick={() => setNewHabit({...newHabit, category: category.name})}
                    style={{ borderColor: newHabit.category === category.name ? category.color : '#ddd' }}
                  >
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => {
                  setShowModal(false);
                  setNewHabit({ name: '', category: '' });
                }}
              >
                Cancel
              </button>
              <button 
                className="submit-btn"
                onClick={handleAddHabit}
                disabled={!newHabit.name.trim() || !newHabit.category}
              >
                Add Habit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
