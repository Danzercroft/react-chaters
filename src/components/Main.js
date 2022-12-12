import React, { Component } from 'react';
import { Route, Routes, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Landing from './Landing';
import Chat from './Chat';

import { connect } from "react-redux";
import LoadingSpinner from './LoadingSpinner';
import ProtectedRoute from './router/ProtectedRoute';
import ProtectedRouteIfAuth from './router/ProtectedRouteIfAuth';

export class Main extends Component {
  render() {
    console.log(this.props.isAuthenticated);
    console.log("main:17");
    if(this.props.isAuthenticated === true || this.props.isAuthenticated === false) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    )
    } else {
      return <LoadingSpinner/>

    }
  }
}

const mapStateToProps = (state) => ({
  //Maps state to redux store as props
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth.user
});

export default connect(mapStateToProps)(Main);
