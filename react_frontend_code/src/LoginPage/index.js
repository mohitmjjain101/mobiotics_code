import React from 'react';
import axios from 'axios'
import { login } from './../utils'
export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    }
  }

  handleValidation = () => {
    let flag = true;

    if (this.state.email === "") {
      this.setState({ errorMessage: 'Email Address is Empty' });
      flag = false;
      return flag;
    } else if (this.state.password === "") {

      this.setState({ errorMessage: "Password Field is Empty" });
      flag = false;
      return flag;
    } else {
      this.setState({ errorMessage: "" })
      return flag;
    }

  }

  handleInput = (event) => {

    let value = event.target.value
    this.setState({ [event.target.name]: value })
    console.log(this.state)
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let result = this.handleValidation();

    if (result == true) {

      let url = "https://rcudfgqcz1.execute-api.ap-south-1.amazonaws.com/test/v1/login"
      let body = {
        "email": this.state.email,
        "password": this.state.password
      }

      axios.post(url, body
        , {
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers' : 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token'

          }
        }

      ).then(res => {

        if (res.data.statusCode == 200) {
          let body = res.data.body;
          console.log(body)
          if (body.authentication == true) {
            console.log("yyyyyyyy")
            login(body.id, body.emailid)
            this.props.history.push('/')
          } else {
            this.setState({ errorMessage: 'Please insert correct username and password' })
          }
        }
      }).catch(err => {
        console.log(err)
      })

    }


  }
  render() {
    return (
      // <form>
      <div>
        <h3>Log in</h3>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-control" placeholder="Enter email" onChange={this.handleInput} />
        </div>

        <div className="form-group">
        <label>Password</label>
          <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={this.handleInput} />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">

          </div>
        </div>

        <button className="btn btn-dark btn-lg btn-block" onClick={this.handleSubmit}>Sign in</button>

        <div style={{marginTop: "10px", color: "red"}} className="form-group">
          <label>{this.state.errorMessage}</label>
        </div>

      </div>
    );
  }
}
