import React from 'react';
import './CreateStudent.css';
import axios from 'axios';

export default class CreateStudent extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.create = this.create.bind(this);
  }

  create(e){
    e.preventDefault();
    this.setState({error: null});
    const email= this.email.value;
    console.log(email);
    if(email.length < 7){
      this.setState({error: "Email too short"})
    }
    const url= this.props.host+'/students';
    const payload= {email}
    axios.post(url,payload)
    .then(rsp => {
      const student = rsp.data;
      this.props.created(student);
      this.email.value = "";
    })
    .catch(e => this.setState({error : e.message}))

  }

  render(){
    return (
      <div className="create-student">
        <h3>Create Student</h3>
        <div className={this.state.error ? "error" : ""}>{this.state.error}</div>
        <form>
          <div className="form-group">
            <label>Email Address</label>
            <input placeholder="student@allstate.com" className="form-control" ref={n => this.email = n} type="email" />
          </div>
          <button className="btn btn-danger btn-small" onClick={this.create}>Create</button>
        </form>
      </div>
    );
  }
}
