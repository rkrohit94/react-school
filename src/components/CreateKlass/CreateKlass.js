import React from 'react';
import './CreateKlass.css';
import axios from 'axios';

export default class CreateKlass extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.create = this.create.bind(this);
  }

  create(e){
    e.preventDefault();
    this.setState({error: null});
    if(this.name.value.length == 0){
      this.setState({error: "Name too short"})
    }
    else if(this.semester.value.length ==0){
      this.setState({error: "date invalid"})
    }
    else if(+this.credits.value <=0){
      this.setState({error: "credits invalid"})
    }
    else if(this.department.value.length ==0){
      this.setState({error: "department not selected"})
    }
    else if(+this.fee.value <=0){
      this.setState({error: "fee too less"})
    }
    else {
      const url= this.props.host+'/klasses';
      const name  =this.name.value
      const semester =this.semester.value
      const credits =+this.credits.value
      const department =this.department.value
      const fee =+this.fee.value
      const payload={name,semester,credits,department,fee}
      axios.post(url,payload)
      .then(rsp => {
        const klasses = rsp.data;
        this.props.created(klasses);
        this.name.value = "";
        this.semester.value = "";
        this.credits.value = "";
        this.department.value = "";
        this.fee.value = "";

      })
      .catch(e => {
        this.setState({error : e.message}
        )
      })
    }
  }

  render(){
    return (
      <div className="create-klass">
        <h3>Create Klass</h3>
        <div className={this.state.error ? "error" : ""}>{this.state.error}</div>
        <form>
          <div className="form-group">
            <label>KlassName</label>
            <input placeholder="klassName" id="klassName" className="form-control" ref={n => this.name = n} type="String" />
            <label>Semester</label>
            <input placeholder="semester" id="semester"className="form-control" ref={n => this.semester = n} type="Date" />
            <label>credits</label>
            <input placeholder="credits" id="credits"className="form-control" ref={n => this.credits = n} type="number" />
            <label>department</label>
            <select placeholder="department" id="department" className="form-control"  ref={n=>this.department = n}>
              <option></option>
              <option>SCIENCE</option>
              <option>ENGINEERING</option>
              <option>LITERATURE</option>
              <option>PHILOSOPHY</option>
            </select>
            <label>fees</label>
            <input placeholder="fee" id="fee" className="form-control" ref={n => this.fee = n} type="decimal" />
            </div>
          <button className="btn btn-danger btn-small" onClick={this.create}>Create</button>
        </form>
      </div>
    );
  }
}
