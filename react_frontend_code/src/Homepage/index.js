import React from 'react';
import { ReactComponent as Logo } from './edit.svg'
import { isLogin, whoLoggedIn } from './../utils'
import axios from 'axios'
import profile from './profile.JPG'
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      firstname: '',
      lastname: '',
      password: '',
      age: null,
      email: '',
      profilePath: '',
      id: null,
      errorMessage: '',
      success: false,
      url: "",
      error: false,
      filename: ''

    }
  }

  handleInput = (event) => {

  }

  editForm = (event) => {
    event.preventDefault()
    this.setState({ disabled: false })
  }

  componentDidMount = () => {

    let result = isLogin();
    if (result == true) {
      this.getuser()
    }

  }

  handleChange = (ev) => {
    this.setState({ success: false, url: "" });

  }

  handleUpload = (ev) => {
    ev.preventDefault()
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    let profile = "http://d1jq2olrzml2ld.cloudfront.net/" + fileName
    this.setState({ filename: profile })
    console.log("Preparing the upload");
    axios.post("http://13.234.237.130:3001/sign_s3", {
      fileName: fileName,
      fileType: fileType
    })
      .then(response => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
        this.setState({ url: url })
        console.log("Recieved a signed request " + signedRequest);

        var options = {
          headers: {
            'Content-Type': fileType
          }
        };
        axios.put(signedRequest, file, options)
          .then(result => {
            this.updateUserAfterFileUpload(ev)
          })
          .catch(error => {
            console.log(error)
            this.setState({ errorMessage: 'Something Went Wrong not able to upload file' })
          })
      })
      .catch(error => {
        alert(JSON.stringify(error));
      })
  }

  updateUserAfterFileUpload = (event) => {
    event.preventDefault()
    let url = "https://rcudfgqcz1.execute-api.ap-south-1.amazonaws.com/test/v1/update"
    let object = {
      "id": this.state.id,
      "age": this.state.age,
      "email": this.state.email,
      "firstname": this.state.firstname,
      "lastname": this.state.lastname,
      "profilepath": this.state.filename,
      "password": this.state.password

    }
    console.log(object)

    axios.post(url, object
      , {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',

        }
      }

    ).then(res => {
      console.log(res.data)
      if (res.data.errorMessage) {
        this.setState({ errorMessage: 'Something went wrong please try again' })
      } else {

        this.getuser();

      }
    }).catch(err => {
      console.log(err)
    })



  }

  updateUser = (event) => {
    event.preventDefault()
    let url = "https://rcudfgqcz1.execute-api.ap-south-1.amazonaws.com/test/v1/update"
    let object = {
      "id": this.state.id,
      "age": this.state.age,
      "email": this.state.email,
      "firstname": this.state.firstname,
      "lastname": this.state.lastname,
      "profilepath": this.state.profilePath,
      "password": this.state.password

    }

    axios.post(url, object
      , {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',

        }
      }

    ).then(res => {
      if (res.data.errorMessage) {
        this.setState({ errorMessage: 'Something went wrong please try again' })
      } else {
        this.setState({ errorMessage: '', disabled: true })
        this.getuser();
      }
    }).catch(err => {
      console.log(err)
    })


  }
  handleInput = (event) => {

    let value = event.target.value
    this.setState({ [event.target.name]: value })
    console.log(this.state)
  }

  getuser = async (event) => {


    let url = "https://rcudfgqcz1.execute-api.ap-south-1.amazonaws.com/test/v1/user"
    let body = {
      "id": whoLoggedIn()

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

      if (res.data.statusCode == 200) {
        if (Array.isArray(res.data.body)) {

          if (res.data.body[0]) {
            let data = res.data.body[0]
            let id = data.id;
            let email = data.emailid;
            let firstname = data.firstname;
            let lastname = data.lastname;
            let age = data.age
            let password = data.password
            let profilePath = data.profile_path
            if (profilePath == null) {
              profilePath = profile
            }
            this.setState({ age: age, email: email, firstname: firstname, lastname: lastname, password: password, id: id, profilePath: profilePath })
          }
        }

      }
    }).catch(err => {
      console.log(err)
    })




  }

  render() {
    return (
      <form>
        <div>
          <button style={{ border:'none', borderRadius:'50%',float: "right",backgroundColor:'#52B788',padding:'5px',color:'#fff' , width:"40px" , height:"40px" }} onClick={this.editForm}><Logo className='logo' /></button>
          <div class="text-center">
            <img src={this.state.profilePath}  alt="..." width="100" height="100" />
          </div>
          {this.state.disabled === false &&
            <div style={{display:'flex',flexDirection:'row',padding:'10px'}} >
            
                <input size="60" onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file" />
           
                <button  style={{border:'none',color:'#fff', fontSize:'12px', width: "60px", height: "30px",backgroundColor:'#52B788',"borderRadius": "10px"  }} onClick={this.handleUpload}>UPLOAD</button>
            
            </div>
          }
          <div style={{marginTop:"20px"}}>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" name="firstname" className="form-control" onChange={this.handleInput} value={this.state.firstname} placeholder="" disabled={this.state.disabled} onChange={this.handleInput} />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="lastname" className="form-control" onChange={this.handleInput} value={this.state.lastname} placeholder="" disabled={this.state.disabled} onChange={this.handleInput} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" className="form-control" onChange={this.handleInput} value={this.state.email} placeholder="" disabled={this.state.disabled} onChange={this.handleInput} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" className="form-control" onChange={this.handleInput} value={this.state.password} placeholder="" disabled={this.state.disabled} onChange={this.handleInput} />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input type="number" name="age" className="form-control" onChange={this.handleInput} placeholder="" value={this.state.age} disabled={this.state.disabled} onChange={this.handleInput} />
            </div>
          </div>
          {this.state.disabled === false &&
            <div>
              <div className="form-group">
                <button className="btn btn-dark btn-lg btn-block" onClick={this.updateUser}>Submit</button>
              </div>
              <div style={{ marginTop: "10px", color: "red" }} className="form-group">
                <label>{this.state.errorMessage}</label>
              </div>
            </div>

          }


        </div>
      </form >


    )
  }
}
