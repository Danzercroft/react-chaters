import React, { Component } from 'react'
import Button from 'reactstrap';
import axios from "axios";


import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

export class Landing extends Component {

  componentDidMount() {

    let tokenValue = localStorage.getItem("LRC_Token");

    axios.defaults.headers.common["Authorization"] =
    "Bearer " + tokenValue;

    axios.get("/api/auth/user")
    .then((res) =>{
      // if(res.status === 201) {
        console.log(res.data.user);
      // }
    })
    .catch((err) => {

    });
  }




  render() {

    return (
      <div>
        <ul>
          <li><a href="register">Register</a></li>
          <li><a href="login">Login</a></li>
          <li><a href="chat">Start Chatting</a></li>
        </ul>
      </div>
    )
  }
}

export default withRouter(Landing);
