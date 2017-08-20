import React, { Component } from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase';
import Router from './Router';
import configureStore from './configureStore';

console.ignoredYellowBox = ['Setting a timer'];

class App extends Component {
  state = {
    store: configureStore()
  };

  render() {
    return (
      <Provider store={this.state.store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
