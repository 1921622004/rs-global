import React, { useState } from 'react';
import { render } from 'react-dom';
import './index.less';

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => {
        setCount(count + 1)
      }}>+</button>
    </div>
  )
}

render(<App />, document.querySelector('#root'));