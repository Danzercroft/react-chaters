import React, { Component } from "react";
import './App.css';
import store from "./store";
import Main from "./components/Main";
import { getUser } from "./actions/authActions";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  componentDidMount() {
      store.dispatch(getUser());
  }

  render() {
      return (
          <Provider store={store}>
              <Main />
          </Provider>
      );
  }
}

export default App;
