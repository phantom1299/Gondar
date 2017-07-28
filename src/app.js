import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

console.ignoredYellowBox = [
    'Setting a timer'
];

class App extends Component {

    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyDwahuRpqlv7pVHvUEp3tndpag71N7-4wg',
            authDomain: 'gondar-eb778.firebaseapp.com',
            databaseURL: 'https://gondar-eb778.firebaseio.com',
            projectId: 'gondar-eb778',
            storageBucket: 'gondar-eb778.appspot.com',
            messagingSenderId: '548114254882'
        };

        firebase.initializeApp(config);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
