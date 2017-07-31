import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Card, CardSection } from './common';

class Profil extends Component {
  render() {
    return (
      <View>
        <Card>
          <CardSection>
            <Text>Merhaba</Text>
          </CardSection>
        </Card>
      </View>
    );
  }
}

export default Profil;
