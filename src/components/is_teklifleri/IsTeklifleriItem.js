import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Card, CardItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';

class IsTeklifleriItem extends Component {
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    if (!this.pressed) {
      this.pressed = true;
      Actions.isDetaylari({ ...this.props, title: this.props.mission.baslik });
    }
    setTimeout(() => { this.pressed = false; }, 2000);
  }

  render() {
    const { baslik, butce, detay, tags, deadline, isVeren } = this.props.mission;
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Card style={{ flex: 0, marginLeft: 5, marginRight: 5 }}>
          <CardItem>
            <Left style={{ flex: 2 }}>
              <Thumbnail source={{ uri: isVeren.profilFotografiUrl }} />
              <Body>
                <Text>
                  {isVeren.isim}
                </Text>
                <Text note>
                  {isVeren.unvan}
                </Text>
              </Body>
            </Left>
            <Right>
              <Text>Deadline:</Text>
              <Text note>
                {deadline}
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                {baslik}
              </Text>
              <Text style={{ padding: 10 }}>
                {detay}
              </Text>
            </Body>
          </CardItem>
          <CardItem style={{ paddingTop: 0, flexWrap: 'wrap' }}>
            {tags.map((tag, i) => {
              return (
                <Text key={i} style={{ color: 'steelblue' }}>
                  #{tag}{' '}
                </Text>
              );
            })}
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default IsTeklifleriItem;
