
import React from 'react';
import LoginPage from './LoginPage'
import Homepage from './Homepage'
import RegisterPage from './RegisterPage'
import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import Upload from './Homepage/fileUplaod'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Link, withRouter } from 'react-router-dom'
import { logout } from './utils'
import { browserHistory, Redirect } from 'react-router';
import './App.css';

import { useLocation, useHistory } from 'react-router-dom';
import axios from "axios";

// class App extends React.Component {
//   componentDidMount() {
//     const api = 'https://395kb4vv3h.execute-api.ap-south-1.amazonaws.com/devtest';
//     const data = { "name": "Mike" };

//     //Access-Control-Allow-Origin
//     axios
//       .post(api, data, {
//         headers: {
//           "Content-Type": "application/json",
//           'Access-Control-Allow-Origin': 'localhost:3000/',
//           'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',

//         }
//       }
//       )
//       .then((response) => {
//         console.log(response);
//         console.log(".............")
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   render() {
//     return (
//       <div>Medium Tutorial</div>
//     );
//   }
// }
// export default App;


class App extends React.Component {

  constructor(props) {
    super(props);
  }



  render() {
    return (
      <div>
        <BrowserRouter>
          <Main></Main>

        </BrowserRouter></div>
    )
  };
}
const Header = withRouter(({ location }) => {
  return (

    <div>
      {
        location.pathname !== "/" &&
        <ul className="navbar-nav ml-auto" >
          <li >
            <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
          </li>
          <li >
            <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
          </li>
        </ul>
      }
      {
        location.pathname === "/" &&
        <ul className="navbar-nav ml-auto" >
          <li >
            <Link className="nav-link" to={"/logout"}>Logout</Link>
          </li>

        </ul>
      }
    </div>

  )
})

const Main = withRouter(({ location }) => {

  let history = useHistory();

  function handleClick() {
    logout();
    history.push("/sign-in");


  }

  return (


    <div>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container">

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">


              {location.pathname === "/" &&
                <ul className="navbar-nav ml-auto" >
                  <li >
                    <button onClick={handleClick} style={{border : 'none'}} className="nav-link  active bg-light" >Logout</button>
                  </li>
                </ul>
              }{location.pathname !== "/" &&
                <ul className="navbar-nav ml-auto" >
                  <li >
                    <Link className="nav-link active bg-light" to={"/sign-in"}>Sign in</Link>
                  </li>
                  <li >
                    <Link className="nav-link active bg-light" to={"/sign-up"}>Sign up</Link>
                  </li>
                </ul>

              }


            </div>
          </div>
        </nav>

        <div className="outer">
          <div className="inner">
            <PublicRoute exact restricted={false} component={LoginPage} path="/sign-in"></PublicRoute>
            <PublicRoute exact restricted={false} component={RegisterPage} path="/sign-up"></PublicRoute>

            <PublicRoute exact restricted={false} component={Upload} path="/upload"></PublicRoute>
            <PrivateRoute component={Homepage} path="/" exact />

          </div>
        </div>
      </div>

      {/* <BrowserRouter>
        <Main></Main>
      </BrowserRouter> */}
    </div>




  )
})

export default App;
