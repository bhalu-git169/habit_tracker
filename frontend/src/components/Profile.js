import React, { useState, useEffect } from 'react';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    avatar: ''
  });
  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch profile');

      const data = await response.json();
      setUser(data.user);
      setFormData({
        full_name: data.user.full_name || '',
        bio: data.user.bio || '',
        avatar: data.user.avatar || ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setUser(data.user);
      setEditing(false);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setError('New passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          current_password: passwordForm.current_password,
          new_password: passwordForm.new_password
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setMessage('Password changed successfully!');
      setShowPasswordChange(false);
      setPasswordForm({
        current_password: '',
        new_password: '',
        confirm_password: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.avatar ? (
              <img src={user.avatar} alt={user.username} />
            ) : (
              <div className="avatar-placeholder">
                {user.username?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h2>{user.username}</h2>
          <p className="profile-email">{user.email}</p>
        </div>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        {!editing ? (
          <div className="profile-info">
            <div className="info-section">
              <h3>Profile Information</h3>
              <div className="info-item">
                <label>Full Name:</label>
                <span>{user.full_name || 'Not set'}</span>
              </div>
              <div className="info-item">
                <label>Bio:</label>
                <span>{user.bio || 'No bio yet'}</span>
              </div>
              <div className="info-item">
                <label>Member Since:</label>
                <span>{new Date(user.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="profile-actions">
              <button onClick={() => setEditing(true)} className="btn-primary">
                Edit Profile
              </button>
              <button onClick={() => setShowPasswordChange(!showPasswordChange)} className="btn-secondary">
                Change Password
              </button>
              <button onClick={handleLogout} className="btn-danger">
                Logout
              </button>
            </div>

            {showPasswordChange && (
              <form onSubmit={handleChangePassword} className="password-form">
                <h3>Change Password</h3>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwordForm.current_password}
                  onChange={(e) => setPasswordForm({...passwordForm, current_password: e.target.value})}
                  required
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordForm.new_password}
                  onChange={(e) => setPasswordForm({...passwordForm, new_password: e.target.value})}
                  required
                  minLength="6"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={passwordForm.confirm_password}
                  onChange={(e) => setPasswordForm({...passwordForm, confirm_password: e.target.value})}
                  required
                  minLength="6"
                />
                <div className="form-buttons">
                  <button type="submit" className="btn-primary">Change Password</button>
                  <button type="button" onClick={() => setShowPasswordChange(false)} className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <form onSubmit={handleUpdateProfile} className="edit-form">
            <h3>Edit Profile</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                placeholder="Your full name"
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Tell us about yourself"
                rows="4"
              />
            </div>
            <div className="form-group">
              <label>Avatar URL</label>
              <input
                type="url"
                value={formData.avatar}
                onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn-primary">Save Changes</button>
              <button type="button" onClick={() => setEditing(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
