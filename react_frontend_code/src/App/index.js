import React from 'react';
import HomePage from './../Homepage'
import LoginPage from './../LoginPage'
import RegisterPage from './../RegisterPage'
import PrivateRoute from './../routes/PrivateRoute'
import PublicRoute from './../routes/PublicRoute'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
    componentDidMount() {
      const api = 'https://395kb4vv3h.execute-api.ap-south-1.amazonaws.com/devtest';
      const data = { "name" : "Mike" };
      axios
        .post(api, data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      }
    render() {
      return (
        <div>Medium Tutorial</div>
      );
    }
  }
  export default App;

// export default class App extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <div>
//                 <Router>
//                     <div className="App">
//                         <nav className="navbar navbar-expand-lg navbar-light fixed-top">
//                             <div className="container">

//                                 <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
//                                     <ul className="navbar-nav ml-auto" >
//                                         <li >
//                                             <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
//                                         </li>
//                                         <li >
//                                             <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>
//                         </nav>

//                         <div className="outer">
//                             <div className="inner">
//                                 {/* <Switch>
//                                     <Route exact path='/' component={LoginPage} />
//                                     <Route path="/sign-in" component={LoginPage} />
//                                     <Route path="/sign-up" component={RegisterPage} />
//                                 </Switch> */}
//                                 <BrowserRouter></BrowserRouter>
//                             </div>
//                         </div>
//                     </div></Router>
//             </div>
//         );
//     }
// }
