import React, { useState, useCallback } from 'react';
//import ChildComponent from './ChildComponent';

const ChildComponent = React.memo(({ onIncrement }) => {
    console.log('ChildComponent rendered');
    return <button onClick={onIncrement}>Increment from Child</button>;
  });
  
//export default ChildComponent;

function CallbackExample() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const incrementCount = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  const handleTextChange = useCallback((event) => {
    setText(event.target.value);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
      <input type="text" value={text} onChange={handleTextChange} />
      <ChildComponent onIncrement={incrementCount} />
    </div>
  );
}

export default CallbackExample;