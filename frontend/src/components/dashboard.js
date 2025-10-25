import { useState } from 'react';
import './dashboard.css';

const categories = [
  { name: 'Health', icon: '💪', color: '#4CAF50' },
  { name: 'Mindfulness', icon: '🧘', color: '#9C27B0' },
  { name: 'Productivity', icon: '📈', color: '#2196F3' },
  { name: 'Learning', icon: '📚', color: '#FF9800' },
  { name: 'Fitness', icon: '🏃', color: '#F44336' },
  { name: 'Sleep', icon: '😴', color: '#673AB7' }
];

export default function Dashboard({ habits, setHabits, username }) {
  const [showModal, setShowModal] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: '', category: '' });

  const weekDays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

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

  // Calculate weekly statistics (habits completed per day)
  const calculateWeeklyStats = () => {
    const dailyStats = Array(7).fill(0);
    
    habits.forEach(habit => {
      habit.weekData.forEach((completed, index) => {
        if (completed) dailyStats[index]++;
      });
    });
    
    return dailyStats;
  };

  // Add new habit
  const handleAddHabit = () => {
    if (newHabit.name.trim() && newHabit.category) {
      const newId = habits.length > 0 ? Math.max(...habits.map(h => h.id)) + 1 : 1;
      setHabits([...habits, {
        id: newId,
        name: newHabit.name.trim(),
        category: newHabit.category,
        weekData: Array(7).fill(false),
        completed: false
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

  const progress = calculateProgress();
  const weeklyStats = calculateWeeklyStats();

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h1 className="app-title">MindTrack - Wellness Tracker</h1>
        <div className="profile-icon">👤</div>
      </header>

      {/* Greeting */}
      <div className="greeting">
        <p>Hello, <span className="username">@{username}</span>!</p>
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
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="motivation-quote">
        <p>"Keep going! You're doing great today!"</p>
      </div>

      {/* Today's Habits */}
      <div className="habits-section">
        <h2>Today's Habits:</h2>
        <div className="habits-list">
          {habits.map(habit => (
            <div key={habit.id} className="habit-item">
              <label className="habit-checkbox">
                <input 
                  type="checkbox" 
                  checked={habit.completed}
                  onChange={() => toggleHabit(habit.id)}
                />
                <span className="checkmark"></span>
                <span className={`habit-name ${habit.completed ? 'completed' : ''}`}>
                  {getCategoryIcon(habit.category)} {habit.name}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Statistics */}
      <div className="weekly-stats-section">
        <h2>Last 7 Days Activity</h2>
        <div className="weekly-stats">
          {weekDays.map((day, index) => (
            <div key={index} className="day-stat">
              <span className="day-name">{day}</span>
              <div className="day-bar-container">
                <div 
                  className="day-bar"
                  style={{ 
                    width: habits.length > 0 ? `${(weeklyStats[index] / habits.length) * 100}%` : '0%'
                  }}
                ></div>
              </div>
              <span className="day-count">{weeklyStats[index]}</span>
            </div>
          ))}
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
