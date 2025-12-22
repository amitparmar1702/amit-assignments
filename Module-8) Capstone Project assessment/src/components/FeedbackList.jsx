import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeedbacks, deleteFeedback } from '../features/feedbackSlice';
import { Trash2, Search, Star } from 'lucide-react';

const FeedbackList = () => {
    const dispatch = useDispatch();
    const { items, status, error } = useSelector((state) => state.feedback);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Correct logic: if idle, fetch.
        if (status === 'idle') {
            dispatch(fetchFeedbacks());
        }
    }, [status, dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            dispatch(deleteFeedback(id));
        }
    };

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="glass-panel" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2>Feedback Records</h2>
                <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                        type="text"
                        className="form-input"
                        style={{ paddingLeft: '2.5rem' }}
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p style={{ color: 'var(--danger)' }}>Error: {error}. Is the JSON server running?</p>}

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Rating</th>
                            <th>Comment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '2px' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    fill={i < item.rating ? '#eab308' : 'none'}
                                                    color={i < item.rating ? '#eab308' : '#64748b'}
                                                />
                                            ))}
                                        </div>
                                    </td>
                                    <td>{item.comment}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)} style={{ padding: '0.4rem', minWidth: 'auto' }} title="Delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                    {items.length === 0 && status !== 'loading' ? 'No records yet. Add one!' : 'No matching records found'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeedbackList;
