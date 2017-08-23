import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
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
        <Root>
          <Router />
        </Root>
      </Provider>
    );
  }
}

export default App;
