import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    const { name, surname, balance, participated_missions } = this.props.user_id;

    return (
      <View>
        <Text>İsim:{name}</Text>
        <Text>Soyisim:{surname}</Text>
        <Text>Bakiye:{balance}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return state.data;
};

export default connect(mapStateToProps)(Home);
