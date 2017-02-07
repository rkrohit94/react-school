import React, { Component } from 'react';
import Sum from './components/Sum/Sum'
import Box from './components/Box/Box'
import CreateStudent from './components/CreateStudent/CreateStudent'
import CreateKlass from './components/CreateKlass/CreateKlass'
import Registration from './components/Registration/Registration'

class App extends Component {

constructor(props){
  super(props)
  this.created = this.created.bind(this);
}

created() {
  console.log("function called");
}

  render() {
    return (
      <div className="app">
        <div className="row">
          <Registration />
        </div>
      </div>
    );
  }
}

export default App;
