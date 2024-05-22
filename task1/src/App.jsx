import React from 'react';
import Partition from './page/Partition';
import { getRandomColor } from './page/utils';
import './App.css';

const App = () => {
  console.log("check rerendering")
  return (
    <div className="app">
      <Partition color={getRandomColor()} />
    </div>
  );
};

export default App;