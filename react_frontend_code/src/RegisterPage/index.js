import React from 'react';
import axios from 'axios'
import { login } from './../utils'
export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      age: null,
      errorMessage: ''
    }
  }


  handleInput = (event) => {
    
    let value = event.target.value
    console.log(value)
    this.setState({ [event.target.name]: value })
    console.log(this.state)
  }
  handleValidation = () => {
    console.log(this.state)
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.state.firstname === "") {
      this.setState({errorMessage : 'Firstname is Empty'})
      return false;
    } else if (this.state.lastname === "") {
      this.setState({ errorMessage: 'Lastname is Empty' })
      return false;
    } else if (!regEmail.test(this.state.email)) {
      this.setState({ errorMessage: 'Email is not valid' })
      return false;
    }

    else if (this.state.email === "") {
      this.setState({ errorMessage: 'Email is Empty' })
      return false;
    } else if (this.state.password === "") {
      this.setState({ errorMessage: 'Password is Empty' })
      return false;
    } else if (this.state.age === null || this.state.age === "") {
      this.setState({ errorMessage: 'Age is Empty' })
      return false;
    } else {
      this.setState({ errorMessage: '' })
      return true;
    }
  }



  handleSubmit = async (event) => {

    event.preventDefault();
    let result = this.handleValidation();
    if (result) {
      console.log("iiiiiiiiiiiiiiiiiiiii")
      let url = "https://rcudfgqcz1.execute-api.ap-south-1.amazonaws.com/test/v1/register"
      let body = {
        "email": this.state.email,
        "password": this.state.password,
        "firstname": this.state.firstname,
        "lastname": this.state.lastname,
        "age": this.state.age
      }

      axios.post(url, body
        , {
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',

          }
        }

      ).then(res => {
        console.log(res)
        if (res.data.statusCode == 200) {
          let body = res.data.body;
          console.log(body)
          if(body.affectedRows ==1){
            alert("user Registerd")
            this.props.history.push('/')
          }
        }
      }).catch(err => {
        console.log(err)
      })


    }

  }



  render() {
    return (
      <form>
        <h3>Register</h3>

        <div className="form-group">
          <label>First name</label>
          <input type="text" name="firstname" className="form-control" onChange={this.handleInput} placeholder="First name" />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input type="text" name="lastname" className="form-control" onChange={this.handleInput} placeholder="Last name" />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={this.handleInput} placeholder="Enter email" />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={this.handleInput} placeholder="Enter password" />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" name="age" className="form-control" onChange={this.handleInput} placeholder="Enter Age" />
        </div>

        <button type="submit" onClick={this.handleSubmit} className="btn btn-dark btn-lg btn-block">Register</button>
        <div style={{ marginTop: "10px", color: "red" }} className="form-group">
          <label>{this.state.errorMessage}</label>
        </div>
      </form>
    )
  }
}
