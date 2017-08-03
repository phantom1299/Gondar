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

  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyDwahuRpqlv7pVHvUEp3tndpag71N7-4wg',
      authDomain: 'gondar-eb778.firebaseapp.com',
      databaseURL: 'https://gondar-eb778.firebaseio.com',
      projectId: 'gondar-eb778',
      storageBucket: 'gondar-eb778.appspot.com',
      messagingSenderId: '548114254882'
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
