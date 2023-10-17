import React, { FC } from 'react';
import createStateHook from './hooks/stateManager';

import './App.css';

const useCounter = createStateHook(0);

const Counter: FC = () => {
  const [count, setCount] = useCounter();

  return (
    <div>
      <h4>Current Count: {count}</h4>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

function App() {
  return (
    <div>
      <Counter />
      <Counter />
      <Counter />
      <Counter />
      <Counter />
    </div>
  );
}

export default App;
