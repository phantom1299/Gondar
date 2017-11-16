import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Content, Card, CardItem, Body, Thumbnail } from 'native-base';
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

class ActiveJobDetail extends Component {
  renderNote = ({ item }) => {
    return (
      <Card>
        <CardItem style={{ backgroundColor: '#B0BEC5' }}>
          <Thumbnail
            small
            blurRadius={1}
            source={{
              uri:
                item.user.avatarUrl ||
                'http://www.oldpotterybarn.co.uk/wp-content/uploads/2015/06/default-medium.png'
            }}
          />
          <Text style={{ marginLeft: '5%', color: '#000' }}>
            {item.user.name} {item.user.surname}
          </Text>
        </CardItem>
        <CardItem style={{ backgroundColor: '#CFD8DC' }}>
          <Body>
            <Text fontSizeMultiplier={0.9}>{item.text}</Text>
          </Body>
        </CardItem>
        <CardItem
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            flex: 1,
            backgroundColor: '#CFD8DCaa'
          }}
        >
          <Text fontSizeMultiplier={0.8} style={{ opacity: 0.78 }} >
            Eklenme Tarihi:
          </Text>
        </CardItem>
      </Card>
    );
  };

  render() {
    return (
      <Content>
        <FlatList
          keyExtractor={item => item.createdAt}
          data={notes}
          renderItem={this.renderNote}
          numColumns={1}
          contentContainerStyle={{ padding: '1%' }}
        />
      </Content>
    );
  }
}

export default ActiveJobDetail;
