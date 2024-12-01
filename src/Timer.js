
/*
On application load, a timer should start that will increment by 1 every 1 second
Create 2 buttons. First button will pause the timer, second will reset the timer
*/

import React, { useState, useEffect } from 'react';


const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [paused, setPaused] = useState(false);


  useEffect(() => {
    let interval
    interval = setInterval(()=>{
       interval = setSeconds((pre)=>pre+1)
    }, 1000)
    return ()=>{
        clearInterval(interval)
    }
  }, [paused]);

  return (
    <div>
      <div>{seconds}</div>
        <button onClick={() => {
            setPaused(!paused)
        }}>{paused ? "Resume": "Pause"}
        </button>
        <button onClick={() => {
            setSeconds(0); 
            setPaused(false);
        }}>Start
        </button>
    </div>
  );
};

export default Timer;
