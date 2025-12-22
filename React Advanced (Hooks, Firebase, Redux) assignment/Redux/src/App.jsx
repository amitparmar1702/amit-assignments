import { useSelector, useDispatch } from 'react-redux';
import './App.css';

function App() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div className="card">
      <h1>Redux Counter</h1>
      <div className="counter-value">{count}</div>
      <div className="button-group">
        <button
          onClick={() => dispatch({ type: 'INCREMENT' })}
          className="btn increment"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch({ type: 'DECREMENT' })}
          className="btn decrement"
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default App;
