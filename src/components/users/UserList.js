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
import { ListView, Dimensions } from 'react-native';
import { getUsers } from '../../data';

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
    name: 'Şamil',
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

const nullfunc = () => null;
const deviceWidth = Dimensions.get('window').width;

class UserList extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerLeft = (
      <Icon
        ios="ios-menu"
        android="md-menu"
        style={{ fontSize: 28, color: 'white', marginLeft: 15 }}
        onPress={() => navigation.navigate('DrawerOpen')}
      />
    );
    const headerRight = (
      <Button transparent small onPress={params.handleNew ? params.handleNew : nullfunc}>
        <Text style={{ fontSize: deviceWidth / 30, color: 'lightblue' }}>Yeni</Text>
      </Button>
    );
    return {
      headerStyle: { backgroundColor: '#4C3E54' },
      headerTintColor: 'white',
      headerTitle: 'Kişiler',
      headerTitleStyle: { alignSelf: 'center', fontSize: deviceWidth / 24 },
      headerLeft,
      headerRight
    };
  };

  constructor() {
    super();
    this.pressed = false;
    this.renderRow = this.renderRow.bind(this);
    this.getUserList = this.getUserList.bind(this);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      loading: true,
      listViewData: []
    };
  }

  componentWillMount() {
    this.getUserList();
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleNew: this._handleNew
    });
  }

  onPressInfo(user) {
    if (!this.pressed) {
      this.pressed = true;
      setTimeout(() => {
        this.pressed = false;
      }, 2000);
      this.props.navigation.navigate('UserProfile', { user, updateUsers: this.getUserList });
    }
  }

  onPressChat(user) {
    if (!this.pressed) {
      this.pressed = true;
      setTimeout(() => {
        this.pressed = false;
      }, 2000);
      this.props.navigation.navigate('Messages', { user });
    }
  }

  getUserList(newUserAdded) {
    if (newUserAdded) {
      this.setState({ newUserLoading: true });
      this.showToast(true);
    } else if (newUserAdded === false) {
      this.setState({ newUserLoading: true });
      this.showToast(false);
    }
    getUsers()
      .then(response => {
        if (response.status === 200) {
          response.json().then(response1 => {
            this.setState({
              listViewData: [].concat(response1),
              loading: false,
              newUserLoading: false
            });
          });
        } else this.getUserList();
      })
      .catch(() => this.getUserList());
  }

  _handleNew = () => {
    this.props.navigation.navigate('NewUser', { updateUsers: this.getUserList });
  };

  showToast(userAdded) {
    if (!userAdded) {
      Toast.show({
        text: 'Kişi başarıyla silindi!',
        position: 'bottom',
        buttonText: 'Tamam',
        type: 'success',
        duration: 2000
      });
    } else if (userAdded) {
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
    if (this.state.loading || this.state.newUserLoading) {
      return <Spinner />;
    }
  }

  renderRow(user) {
    return (
      <ListItem avatar button onPress={() => this.onPressInfo(user)}>
        <Left>
          <Thumbnail
            small
            source={{
              uri:
                user.avatarUrl ||
                'http://www.oldpotterybarn.co.uk/wp-content/uploads/2015/06/default-medium.png'
            }}
          />
        </Left>
        <Body>
          <Text style={{ fontSize: deviceWidth / 26 }}>
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
