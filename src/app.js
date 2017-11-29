import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Provider, connect } from 'react-redux';
import { Root } from 'native-base';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { Router } from './Router';
import configureStore from './configureStore';

console.ignoredYellowBox = ['Setting a timer'];

class App1 extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index >= 1) {
      dispatch(NavigationActions.back());
    }
    return true;
  };
  render() {
    const { dispatch, nav } = this.props;
    return (
      <Router
        navigation={addNavigationHelpers({
          dispatch,
          state: nav
        })}
      />
    );
  }
}

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
