import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection } from '../common';

class IsTeklifleriItem extends Component {
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    Actions.isDetaylari();
  }
  
  render() {
    const { name, budget, description, tags, deadline } = this.props.mission;
    const { container, nameStyle, descriptionStyle, tagStyle, budgetStyle, deadlineStyle } = styles;
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Card>
          <CardSection style={container}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 3 }}>
                <Text style={nameStyle}>{name}</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text style={budgetStyle}>Bütçe: {budget}₺</Text>
              </View>
            </View>
            <View>
              <Text
                style={descriptionStyle}
                numberOfLines={3}
              >{description}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text numberOfLines={2} style={tagStyle}>{tags}</Text>
              </View>
              <View style={{ flex: 2, justifyContent: 'flex-end' }}>
                <Text style={deadlineStyle}>Deadline: {deadline}</Text>
              </View>
            </View>
          </CardSection>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 15,
    backgroundColor: 'rgba(183, 204, 218, 1)'
  },
  nameStyle: {
    fontSize: 22,
    paddingBottom: 1,
    paddingLeft: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  descriptionStyle: {
    fontSize: 18,
    lineHeight: 18,
    paddingBottom: 20,
    paddingTop: 0,
    paddingLeft: 5,

  },
  tagStyle: {
    color: 'blue',
    fontSize: 12
  },
  budgetStyle: {
    fontSize: 20,
    alignSelf: 'flex-end'
  },
  deadlineStyle: {
    fontSize: 18,
    alignSelf: 'flex-end'
  },
});

export default IsTeklifleriItem;
