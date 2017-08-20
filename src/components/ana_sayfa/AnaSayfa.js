import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import AktifIslerim from './AktifIslerim';

class AnaSayfa extends Component {
  render() {
    return (
      <View>
        <Text style={{ fontSize: 20, marginLeft: 10, marginTop: 10, marginBottom: 5 }}>
          Aktiv İşlerin:
        </Text>
        <ScrollView
          style={{ padding: 10 }}
          overScrollMode="always"
          contentContainerStyle={{ paddingBottom: 50 }}
        >
          <AktifIslerim />
          <AktifIslerim />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return state.user.kullanici;
};

export default connect(mapStateToProps)(AnaSayfa);
