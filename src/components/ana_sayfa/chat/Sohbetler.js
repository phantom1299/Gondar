import React, { Component } from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Thumbnail,
  Text,
  Header,
  Item,
  Icon,
  Button,
  Input
} from 'native-base';
import { Actions } from 'react-native-router-flux';

const chats = [
  {
    thumbnail: 'http://www.thumbshots.com/portals/0/Images/StayLonger.png',
    name: 'Arctory',
    last: {
      text: 'halletik, çıkartıyorum apkyı',
      createdAt: '15:02',
      username: 'Siz:'
    }
  },
  {
    thumbnail: 'http://www.thumbshots.com/portals/0/Images/StayLonger.png',
    name: 'Kapak Tasarımı',
    last: {
      text: 'tmm apkyı çıkartıyorum',
      createdAt: '9:02',
      username: 'Aslı:'
    }
  },
  {
    thumbnail: 'http://www.thumbshots.com/portals/0/Images/StayLonger.png',
    name: 'Dergi',
    last: {
      text: 'tamamdır hallediyorum',
      createdAt: '23.08.17',
      username: 'Berat:'
    }
  },
  {
    thumbnail: 'http://www.thumbshots.com/portals/0/Images/StayLonger.png',
    name: 'Mehmet Dağdelen',
    last: {
      text: 'tmm apkyı çıkartıyorum',
      createdAt: '23.08.17'
    }
  }
];

class Sohbetler extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List
            dataArray={chats}
            renderRow={chat =>
              <List>
                <ListItem avatar button onPress={() => Actions.mesajlar({ title: chat.name })}>
                  <Left>
                    <Thumbnail source={{ uri: chat.thumbnail }} />
                  </Left>
                  <Body>
                    <Text>
                      {chat.name}
                    </Text>
                    <Text note>
                      {chat.last.username} <Text note>{chat.last.text}</Text>
                    </Text>
                  </Body>
                  <Right>
                    <Text note>
                      {chat.last.createdAt}
                    </Text>
                  </Right>
                </ListItem>
              </List>}
          />
        </Content>
      </Container>
    );
  }
}

export default Sohbetler;
