import React, { Component } from 'react';
import { Dimensions, Platform, UIManager, LayoutAnimation, TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  View,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Icon
} from 'native-base';
import { AutoText as Text } from './common';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class DrawerExample extends Component {
  static navigationOptions = ({ navigation }) => {
    const headerLeft = (
      <Icon
        ios="ios-menu"
        android="md-menu"
        style={{ fontSize: 28, color: 'white', marginLeft: 15 }}
        onPress={() => navigation.navigate('DrawerOpen')}
      />
    );
    return {
      headerStyle: { backgroundColor: '#4C3E54' },
      headerTintColor: 'white',
      headerTitle: 'Ayarlar',
      headerTitleStyle: { alignSelf: 'center', fontSize: deviceWidth / 24 },
      headerLeft,
      headerRight: <View />
    };
  };

  render() {
    return (
      <Content>
        <View style={{ alignSelf: 'center', justifyContent: 'center', height: deviceHeight }}>
          <Text fontSizeMultiplier={1.5} style={{ justifyContent: 'center' }}>
            (Yapılacak)
          </Text>
        </View>
      </Content>
    );
  }
}
