import React, { useState, useMemo } from 'react';

function ExpensiveCalculation() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  const doubleNumber = useMemo(() => {
    return slowFunction(number);
  }, [number]);

  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? 'black' : 'white',
      color: dark ? 'white' : 'black'
    };
  }, [dark]);

  return (
    <>
      <input type="number" value={number} onChange={e => setNumber(parseInt(e.target.value))} />
      <button onClick={() => setDark(prevDark => !prevDark)}>Toggle theme</button>
      <div style={themeStyles}>{doubleNumber}</div>
    </>
  );
}

function slowFunction(num) {
  console.log('Calling slow function');
  for (let i = 0; i <= 1000000000; i++) {}
  return num * 2;
}


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

export default ExpensiveCalculation;