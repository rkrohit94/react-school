import React, { Component } from 'react';
import Sum from './components/Sum/Sum'
import Box from './components/Box/Box'
class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>Class Front</h1>
        <Sum />
        <Box text="thiru@hotmail.com"/>
      </div>
    );
  }
}

export default App;
