import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Root } from 'native-base';
import { addNavigationHelpers } from 'react-navigation';
import { Router } from './Router';
import configureStore from './configureStore';

console.ignoredYellowBox = ['Setting a timer'];

const App1 = ({ dispatch, nav }) => (
  <Router
    navigation={addNavigationHelpers({
      dispatch,
      state: nav
    })}
  />
);

const mapStateToProps = state => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App1);

class App extends Component {
  state = {
    store: configureStore()
  };

  render() {
    return (
      <Provider store={this.state.store}>
        <Root>
          <AppWithNavigationState />
        </Root>
      </Provider>
    );
  }
}

export default App;
