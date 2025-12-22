import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFeedback } from '../features/feedbackSlice';
import { Star } from 'lucide-react';

const FeedbackForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        comment: '',
        rating: 0
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters';
        if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be exactly 10 digits';
        if (formData.comment.trim().length === 0) newErrors.comment = 'Comment is required';
        if (formData.rating === 0) newErrors.rating = 'Please select a rating';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        dispatch(addFeedback({ ...formData, id: Date.now().toString() })); // Simple ID generation
        setFormData({ name: '', phone: '', comment: '', rating: 0 });
        setErrors({});
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem' }}>
            <h2>Submit Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                        className="form-input"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                    />
                    {errors.name && <div className="error-msg">{errors.name}</div>}
                </div>

                <div className="form-group">
                    <label className="form-label">Phone No</label>
                    <input
                        className="form-input"
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="1234567890"
                    />
                    {errors.phone && <div className="error-msg">{errors.phone}</div>}
                </div>

                <div className="form-group">
                    <label className="form-label">Rating</label>
                    <div style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                fill={star <= formData.rating ? '#eab308' : 'none'}
                                color={star <= formData.rating ? '#eab308' : '#64748b'}
                                onClick={() => setFormData({ ...formData, rating: star })}
                            />
                        ))}
                    </div>
                    {errors.rating && <div className="error-msg">{errors.rating}</div>}
                </div>

                <div className="form-group">
                    <label className="form-label">Comment</label>
                    <textarea
                        className="form-textarea"
                        rows="4"
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        placeholder="Share your experience..."
                    />
                    {errors.comment && <div className="error-msg">{errors.comment}</div>}
                </div>

                <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;
