import { useState } from 'react';
import { Pie, Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from 'chart.js';
import './Statistics.css';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

export default function Statistics({ habits }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek, year, month };
  };

  // Get habits for specific date
  const getHabitsForDate = (date) => {
    // Simulate habit completion data based on weekData
    const dayIndex = date.getDay();
    return habits.filter(habit => habit.weekData && habit.weekData[dayIndex]);
  };

  // Calculate category distribution
  const getCategoryData = () => {
    const categoryCounts = {};
    habits.forEach(habit => {
      categoryCounts[habit.category] = (categoryCounts[habit.category] || 0) + 1;
    });

    return {
      labels: Object.keys(categoryCounts),
      datasets: [{
        data: Object.values(categoryCounts),
        backgroundColor: [
          'rgba(76, 175, 80, 0.8)',
          'rgba(156, 39, 176, 0.8)',
          'rgba(33, 150, 243, 0.8)',
          'rgba(255, 152, 0, 0.8)',
          'rgba(244, 67, 54, 0.8)',
          'rgba(103, 58, 183, 0.8)',
        ],
        borderColor: [
          'rgba(76, 175, 80, 1)',
          'rgba(156, 39, 176, 1)',
          'rgba(33, 150, 243, 1)',
          'rgba(255, 152, 0, 1)',
          'rgba(244, 67, 54, 1)',
          'rgba(103, 58, 183, 1)',
        ],
        borderWidth: 2,
      }]
    };
  };

  // Calculate weekly completion trend
  const getWeeklyTrend = () => {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const completionCounts = Array(7).fill(0);

    habits.forEach(habit => {
      if (habit.weekData) {
        habit.weekData.forEach((completed, index) => {
          if (completed) completionCounts[index]++;
        });
      }
    });

    return {
      labels: weekDays,
      datasets: [{
        label: 'Habits Completed',
        data: completionCounts,
        fill: true,
        backgroundColor: 'rgba(102, 126, 234, 0.2)',
        borderColor: 'rgba(102, 126, 234, 1)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(102, 126, 234, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      }]
    };
  };

  // Calculate completion rate per habit
  const getHabitCompletionRates = () => {
    return {
      labels: habits.map(h => h.name),
      datasets: [{
        label: 'Completion Rate (%)',
        data: habits.map(h => {
          if (!h.weekData) return 0;
          const completed = h.weekData.filter(d => d).length;
          return Math.round((completed / h.weekData.length) * 100);
        }),
        backgroundColor: 'rgba(102, 126, 234, 0.8)',
        borderColor: 'rgba(102, 126, 234, 1)',
        borderWidth: 2,
      }]
    };
  };

  // Calculate statistics
  const totalHabits = habits.length;
  const totalCompletions = habits.reduce((acc, h) => 
    acc + (h.weekData ? h.weekData.filter(d => d).length : 0), 0
  );
  const averageCompletion = totalHabits > 0 
    ? Math.round((totalCompletions / (totalHabits * 7)) * 100) 
    : 0;
  const perfectDays = (() => {
    let count = 0;
    for (let i = 0; i < 7; i++) {
      if (habits.every(h => h.weekData && h.weekData[i])) count++;
    }
    return count;
  })();

  // Calendar navigation
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const selectDate = (day) => {
    setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const calendarDays = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const selectedDateHabits = getHabitsForDate(selectedDate);
  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear();
  };

  return (
    <div className="statistics-container">
      <header className="statistics-header">
        <h1>Statistics & Analytics</h1>
        <p className="statistics-subtitle">Track your progress and insights</p>
      </header>

      {/* Summary Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{totalHabits}</h3>
            <p>Total Habits</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{totalCompletions}</h3>
            <p>Total Completions</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>{averageCompletion}%</h3>
            <p>Average Completion</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <h3>{perfectDays}</h3>
            <p>Perfect Days</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Pie Chart */}
        <div className="chart-card">
          <h3>Habits by Category</h3>
          <div className="chart-wrapper">
            {habits.length > 0 ? (
              <Pie 
                data={getCategoryData()} 
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    }
                  }
                }}
              />
            ) : (
              <p className="no-data">No habits to display</p>
            )}
          </div>
        </div>

        {/* Line Chart */}
        <div className="chart-card">
          <h3>Weekly Completion Trend</h3>
          <div className="chart-wrapper">
            <Line 
              data={getWeeklyTrend()} 
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="chart-card full-width">
          <h3>Completion Rate by Habit</h3>
          <div className="chart-wrapper">
            <Bar 
              data={getHabitCompletionRates()} 
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      callback: (value) => value + '%'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="calendar-section">
        <div className="calendar-card">
          <div className="calendar-header">
            <button onClick={previousMonth} className="calendar-nav-btn">
              ← Previous
            </button>
            <h3>
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <button onClick={nextMonth} className="calendar-nav-btn">
              Next →
            </button>
          </div>

          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`calendar-day ${day ? 'active' : 'empty'} ${
                  day && isToday(day) ? 'today' : ''
                } ${
                  day === selectedDate.getDate() &&
                  currentMonth.getMonth() === selectedDate.getMonth() &&
                  currentMonth.getFullYear() === selectedDate.getFullYear()
                    ? 'selected'
                    : ''
                }`}
                onClick={() => day && selectDate(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Date Habits */}
        <div className="selected-date-card">
          <h3>
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          <div className="date-habits">
            {selectedDateHabits.length > 0 ? (
              <>
                <p className="habits-count">
                  {selectedDateHabits.length} habit{selectedDateHabits.length !== 1 ? 's' : ''} completed
                </p>
                <ul className="habits-list-date">
                  {selectedDateHabits.map(habit => (
                    <li key={habit.id} className="habit-item-date">
                      <span className="habit-check">✓</span>
                      {habit.name}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="no-habits">
                <span className="no-habits-icon">📅</span>
                <p>Habit not updated for this date</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
