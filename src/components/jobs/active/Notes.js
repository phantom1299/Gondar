import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { Content, Card, CardItem, Body, Thumbnail, Icon } from 'native-base';
import { AutoText as Text } from '../../common';

const notes = [
  {
    createdAt: '1',
    user: {
      name: 'System',
      surname: 'Admin'
    },
    text: 'Bu iş teklifine ait notlar bulunmamaktadır. Bu test datasıdır.'
  },
  {
    createdAt: '2',
    user: {
      name: 'Test',
      surname: 'User'
    },
    text: 'not 1 içerik'
  },
  {
    createdAt: '3',
    user: {
      name: 'Test',
      surname: 'User'
    },
    text: 'not 2 içerik'
  },
  {
    createdAt: '4',
    user: {
      name: 'Test',
      surname: 'User'
    },
    text: 'not 2 içerik'
  }
];

class Notes extends Component {
  renderNote = ({ item }) => {
    const user = this.props.participants.concat(this.props.employer).find(participant => {
      return participant._id === item.user;
    });
    if (user) {
      return (
        <Card>
          <CardItem style={{ paddingHorizontal: 0 }}>
            <Thumbnail
              small
              blurRadius={1}
              source={{
                uri:
                  user.avatarUrl ||
                  'http://www.oldpotterybarn.co.uk/wp-content/uploads/2015/06/default-medium.png'
              }}
            />
            <Text style={{ marginLeft: '5%', color: '#000' }}>
              {user.name} {user.surname}
            </Text>
            <View
              style={{
                justifyContent: 'flex-end',
                paddingHorizontal: 0,
                alignItems: 'flex-end',
                flex: 1
              }}
            >
              <Icon name={'md-create'} />
            </View>
          </CardItem>
          <CardItem style={{ paddingHorizontal: 0 }}>
            <Body>
              <Text fontSizeMultiplier={0.9}>{item.text}</Text>
            </Body>
          </CardItem>
          <CardItem
            style={{
              justifyContent: 'flex-end',
              paddingHorizontal: 0,
              alignItems: 'flex-end',
              flex: 1
            }}
          >
            <Text fontSizeMultiplier={0.8} style={{ opacity: 0.78 }}>
              Eklenme Tarihi:
            </Text>
          </CardItem>
        </Card>
      );
    }
  };

  render() {
    return (
      <Content>
        <FlatList
          keyExtractor={note => note._id}
          data={this.props.notes}
          renderItem={this.renderNote}
          numColumns={1}
          contentContainerStyle={{ padding: '1%' }}
        />
      </Content>
    );
  }
}

export default Notes;
