import { useState, useEffect } from 'react'
import './index.css'

const API_URL = "http://localhost:3000/users";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });
  const [editingId, setEditingId] = useState(null);

  // GET: Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // POST: Add a new user
  const addUser = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    try {
      // Create new user object. Status defaults to Active.
      // Note: json-server automatically generates IDs.
      const newUser = { ...formData, status: "Active" };
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      setFormData({ name: '', email: '', role: '' });
      fetchUsers(); // Refresh list to see new data
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // PUT: Update entire user (Edit)
  const updateUser = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    try {
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        // PUT replaces the entire resource, so we include all fields
        body: JSON.stringify({ ...formData, status: "Active" }), 
      });
      setEditingId(null);
      setFormData({ name: '', email: '', role: '' });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // DELETE: Remove user
  const deleteUser = async (id) => {
    if(!confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // PATCH: Partially update (Toggle Status)
  const toggleStatus = async (user) => {
    try {
      const newStatus = user.status === "Active" ? "Inactive" : "Active";
      await fetch(`${API_URL}/${user.id}`, {
        method: "PATCH", // PATCH only updates the fields provided
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchUsers();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    if (editingId) {
      updateUser(e);
    } else {
      addUser(e);
    }
  };

  // Fill form for editing
  const handleEditClick = (user) => {
    setEditingId(user.id);
    setFormData({ name: user.name, email: user.email, role: user.role });
  };

  return (
    <div className="container">
      <h1>Json-server CRUD App</h1>
      
      {/* Form Section */}
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Name" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required
          />
          <input 
            type="text" 
            placeholder="Role" 
            value={formData.role} 
            onChange={(e) => setFormData({...formData, role: e.target.value})} 
            required
          />
          <button type="submit" className="primary">
            {editingId ? "Update (PUT)" : "Add (POST)"}
          </button>
          {editingId && (
            <button type="button" onClick={() => {
              setEditingId(null);
              setFormData({ name: '', email: '', role: '' });
            }}>Cancel</button>
          )}
        </form>
      </div>

      {/* User List */}
      <div className="user-list">
        {users.length === 0 && <p>No users found. Server might be down.</p>}
        {users.map((user) => (
          <div key={user.id} className="user-item">
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.email} • <strong>{user.role}</strong></p>
              <p style={{ 
                color: user.status === 'Active' ? '#4caf50' : '#f44336', 
                fontWeight: 'bold', fontSize: '0.9em' 
              }}>
                ● {user.status}
              </p>
            </div>
            <div className="actions">
              <button 
                className="edit" 
                onClick={() => handleEditClick(user)}
                title="Edit this user"
              >
                Edit
              </button>
              <button 
                onClick={() => toggleStatus(user)} 
                title="Toggle status using PATCH"
              >
                {user.status === "Active" ? "Deactivate" : "Activate"}
              </button>
              <button 
                className="danger" 
                onClick={() => deleteUser(user.id)}
                title="Delete this user"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
