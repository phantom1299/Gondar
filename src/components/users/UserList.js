import React, { Component } from 'react';
import {
  Container,
  Content,
  Spinner,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Thumbnail,
  Text,
  Button,
  Icon
} from 'native-base';
import { ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { data } from '../../data';

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const users = [
  {
    tcKimlikNo: '59653468490',
    avatarU: 'https://randomuser.me/api/portraits/men/29.jpg',
    name: 'Berat',
    surname: 'Karas',
    email: 'berat.karas@gmail.com',
    telephone: '589 923 5656',
    address: 'Cihangir mah. Bozdağ sok. Avcılar İstanbul',
    tags: ['yönetici', 'iş veren']
  },
  {
    tcKimlikNo: '59653468490',
    avatarU: 'https://randomuser.me/api/portraits/men/82.jpg',
    name: 'Şamil Er',
    surname: 'Er',
    email: 'samil.er@gmail.com',
    telephone: '598 932 6565',
    address: 'Cihangir mah. Bozdağ sok. Taksim İstanbul',
    tags: ['grafiker', 'tasarımcı']
  },
  {
    tcKimlikNo: '59653468490',
    avatarU: 'https://randomuser.me/api/portraits/men/17.jpg',
    name: 'Kerem',
    surname: 'Asya',
    email: 'kreme.asya@gmail.com',
    telephone: '598 932 6565',
    address: 'Cihangir mah. Bozdağ sok. Yok İstanbul',
    tags: ['grafiker', 'tasarımcı', 'editör']
  },
  {
    tcKimlikNo: '59653468490',
    avatarU: 'https://randomuser.me/api/portraits/women/49.jpg',
    name: 'Aslı',
    surname: 'Dağdelen',
    email: 'asli.dagdelen@gmail.com',
    telephone: '598 932 6565',
    address: 'Cihangir mah. Bozdağ sok. Taksim İstanbul',
    tags: ['grafiker', 'tasarımcı']
  }
];

class UserList extends Component {
  constructor() {
    super();
    this.pressed = false;
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      loading: true,
      listViewData: users
    };
  }

  componentWillMount() {
    console.log(this.props);
    fetch(`${data.url}/kullanicilar`) //default olarak get on
      .then(response => {
        response
          .json()
          .then(response1 =>
            this.setState({ listViewData: users.concat(response1), loading: false })
          );
      })
      .catch(console.log);
  }

  onPressInfo(user) {
    if (!this.pressed) {
      this.pressed = true;
      setTimeout(() => {
        this.pressed = false;
      }, 2000);
      Actions.userProfile({ user, title: `${user.name} ${user.surname}` });
    }
  }

  onPressChat(user) {
    if (!this.pressed) {
      this.pressed = true;
      setTimeout(() => {
        this.pressed = false;
      }, 2000);
      Actions.messages({ title: user.name });
    }
  }

  renderLoading() {
    if (this.state.loading) {
      return <Spinner />;
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <List
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={user => (
              <ListItem avatar button onPress={this.onPressInfo.bind(this, user)}>
                <Left>
                  <Thumbnail
                    source={{
                      uri:
                        user.avatarU ||
                        'http://www.oldpotterybarn.co.uk/wp-content/uploads/2015/06/default-medium.png'
                    }}
                  />
                </Left>
                <Body>
                  <Text>
                    {user.name} {user.surname}
                  </Text>
                </Body>
              </ListItem>
            )}
            renderLeftHiddenRow={() => null}
            renderRightHiddenRow={(user, secId, rowId, rowMap) => (
              <Body style={{ flexDirection: 'row' }}>
                {/* <Left>
                  <Button
                    full
                    style={{ height: '100%' }}
                    onPress={this.onPressInfo.bind(this, user)}
                  >
                    <Icon active name="information-circle" />
                  </Button>
                </Left> */}
                <Right>
                  <Button
                    full
                    success
                    style={{ height: '100%' }}
                    onPress={this.onPressChat.bind(this, user)}
                  >
                    <Icon active name="ios-chatbubbles" />
                  </Button>
                </Right>
              </Body>
            )}
            disableRightSwipe
            rightOpenValue={-75}
          />
          {this.renderLoading()}
        </Content>
      </Container>
    );
  }
}

export default UserList;
