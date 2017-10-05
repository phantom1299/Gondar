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
  Icon,
  Toast
} from 'native-base';
import { ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { data } from '../../data';

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const users = [
  {
    tcId: '59653468490',
    avatarUrl: 'https://randomuser.me/api/portraits/men/29.jpg',
    name: 'Berat',
    surname: 'Karas',
    email: 'berat.karas@gmail.com',
    telephone: '589 923 5656',
    address: 'Cihangir mah. Bozdağ sok. Avcılar İstanbul',
    tags: ['yönetici', 'iş veren']
  },
  {
    tcId: '59653468490',
    avatarUrl: 'https://randomuser.me/api/portraits/men/82.jpg',
    name: 'Şamil Er',
    surname: 'Er',
    email: 'samil.er@gmail.com',
    telephone: '598 932 6565',
    address: 'Cihangir mah. Bozdağ sok. Taksim İstanbul',
    tags: ['grafiker', 'tasarımcı']
  },
  {
    tcId: '59653468490',
    avatarUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
    name: 'Kerem',
    surname: 'Asya',
    email: 'kreme.asya@gmail.com',
    telephone: '598 932 6565',
    address: 'Cihangir mah. Bozdağ sok. Yok İstanbul',
    tags: ['grafiker', 'tasarımcı', 'editör']
  },
  {
    tcId: '59653468490',
    avatarUrl: 'https://randomuser.me/api/portraits/women/49.jpg',
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
    this.renderRow = this.renderRow.bind(this);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      loading: true,
      listViewData: users
    };
  }

  componentWillMount() {
    console.log(this.props.userDeleted);
    fetch(`${data.url}/users`) //default olarak get on
      .then(response => {
        response.json().then(response1 => {
          this.setState({ listViewData: users.concat(response1), loading: false });
          this.showToast();
        });
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

  showToast() {
    if (this.props.userDeleted) {
      Toast.show({
        text: 'Kişi başarıyla silindi!',
        position: 'bottom',
        buttonText: 'Tamam',
        type: 'success',
        duration: 2000
      });
    } else if (this.props.userAdded) {
      Toast.show({
        text: 'Kişi başarıyla eklendi!',
        position: 'bottom',
        buttonText: 'Tamam',
        type: 'success',
        duration: 2000
      });
    }
  }

  renderLoading() {
    if (this.state.loading) {
      return <Spinner />;
    }
  }

  renderRow(user) {
    return (
      <ListItem avatar button onPress={() => this.onPressInfo(user)}>
        <Left>
          <Thumbnail
            source={{
              uri:
                user.avatarUrl ||
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
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <List
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={this.renderRow}
            renderLeftHiddenRow={() => null}
            renderRightHiddenRow={(user, secId, rowId, rowMap) => (
              <Button full success onPress={() => this.onPressChat(user)}>
                <Icon active name="ios-chatbubbles" />
              </Button>
            )}
            disableRightSwipe
            closeOnRowBeginSwipe
            rightOpenValue={-75}
          />
          {this.renderLoading()}
        </Content>
      </Container>
    );
  }
}

export default UserList;
