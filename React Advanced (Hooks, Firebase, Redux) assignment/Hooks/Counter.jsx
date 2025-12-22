import React, { useState } from 'react';

const Counter = () => {
    // Initialize state with 0
    const [count, setCount] = useState(0);

    // Function to increment the counter
    const handleIncrement = () => {
        setCount(count + 1);
    };

    // Function to decrement the counter
    const handleDecrement = () => {
        setCount(count - 1);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Counter App</h1>
            <h2 style={{ fontSize: '3rem', margin: '20px' }}>{count}</h2>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <button
                    onClick={handleIncrement}
                    style={{
                        padding: '10px 20px',
                        fontSize: '1rem',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Increment
                </button>

                <button
                    onClick={handleDecrement}
                    style={{
                        padding: '10px 20px',
                        fontSize: '1rem',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Decrement
                </button>
            </div>
        </div>
    );
};

export default Counter;
