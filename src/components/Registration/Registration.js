import React from 'react';
import './Registration.css';
import CreateStudent from '../CreateStudent/CreateStudent'
import CreateKlass from '../CreateKlass/CreateKlass'
import axios from 'axios';
import List from '../List/List'

export default class Registration extends React.Component{
  constructor(props){
    super(props);
    this.state = {student :[], klasses :[]};
    this.created = this.created.bind(this);
  }

  componentDidMount(){
    axios.get(`http://localhost:9000/students/`)
        .then((response) => {
            const data = response.data;
            this.setState({student:data})
        })
        .catch(function (error) {
            console.log(error);
        });
    axios.get(`http://localhost:9000/klasses/`)
        .then((response) => {
            const data = response.data;
            this.setState({klasses:data})
        })
        .catch(function (error) {
            console.log(error);
        });
      }
  created(e){
    // e.preventDefault();
    // this.setState({error: null});
    // const email= this.email.value;
    // console.log(email);
    // if(email.length < 7){
    //   this.setState({error: "Email too short"})
    // }
    // const url= this.props.host+'/students';
    // const payload= {email}
    // axios.post(url,payload)
    // .then(rsp => {
    //   const student = rsp.data;
    //   this.props.created(student);
    //   this.email.value = "";
    // })
    // .catch(e => this.setState({error : e.message}))

  }

  render(){
    const students = [];
    // for(let i =0; i<this.state.student.length; i++){
    //   students.setState(id: this.state.student.get(i).id , text : this.state.student.get(i).email , css:"selected", click: {this.clickMethod});
    // }
    // this.state.student.map(element => {element.email})
    // console.log("=============",studentList);
    return (
      <div className="registration">
        <h3>Registration</h3>
        <div className="col-xs-6">
          <CreateStudent host="http://localhost:9000" created = {this.created}/>
        </div>
        <div className="col-xs-6">
          <CreateKlass host="http://localhost:9000" created = {this.created}/>
        </div>
        <div className="col-xs-6" >
               <List  header="Students" />
        </div>
        <div className="col-xs-6" >
           <ul className="list-group" className="KlassList">
              {
              this.state.klasses.map((element,index)=><li className="list-group-item" key={index}>{element.name}</li>)
              }
          </ul>
        </div>
      </div>
    );
  }
}
