import React from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

function App() {
  return (
    <div className="container">
      <h1>Hotel Feedback System</h1>
      <div className="grid-layout">
        <aside>
          <FeedbackForm />
        </aside>
        <main>
          <FeedbackList />
        </main>
      </div>
    </div>
  );
}

export default App;
