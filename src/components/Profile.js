import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Linking, Alert, Modal, Dimensions, Image } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import {
  Container,
  Content,
  Card,
  CardItem,
  Icon,
  Button,
  Form,
  Item,
  Input,
  Label,
  Spinner,
  Thumbnail
} from 'native-base';

import { AutoText as Text } from './common';

import {
  userReset,
  editUser,
  editUserCancel,
  updateUser,
  userAvatarChanged,
  userNameChanged,
  userSurnameChanged,
  userTelephoneChanged,
  userEmailChanged,
  userAddressChanged,
  userSocialAccountsChanged,
  onSocialAccountDelete
} from '../actions';

const nullfunc = () => null;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Profile extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerRight = (
      <Button onPress={params.handleSave ? params.handleSave : nullfunc}>
        <Text>Kaydet</Text>
      </Button>
    );
    let headerLeft = (
      <Icon
        ios="ios-menu"
        android="md-menu"
        style={{ color: 'white', marginLeft: 15 }}
        onPress={() => navigation.navigate('DrawerOpen')}
      />
    );
    if (params.loading) {
      headerRight = <Spinner style={{ marginRight: 10 }} />;
    } else if (params.editable) {
      headerRight = (
        <Button small transparent onPress={() => params.handleSave(params.user)}>
          <Text style={{ color: 'lightblue' }}>Kaydet</Text>
        </Button>
      );
      headerLeft = (
        <Button small transparent onPress={() => params.handleCancel()}>
          <Text style={{ color: 'lightblue' }}>Vazgeç</Text>
        </Button>
      );
    } else {
      headerRight = (
        <Button small transparent onPress={() => params.handleEdit()}>
          <Text style={{ color: 'lightblue' }}>Düzenle</Text>
        </Button>
      );
    }
    return {
      headerStyle: { backgroundColor: '#4C3E54' },
      headerTintColor: 'white',
      headerTitle: 'Profilim',
      headerTitleStyle: { alignSelf: 'center' },
      headerLeft,
      headerRight
    };
  };

  _handleEdit = () => {
    this.props.navigation.setParams({ editable: true });
    this.props.editUser();
  };

  _handleCancel = () => {
    this.props.navigation.setParams({ editable: false });
    this.props.editUserCancel();
    console.log(this.props.user.socialAccounts);
    console.log(this.props.backup.socialAccounts);
  };

  _handleSave = () => {
    this.props.navigation.setParams({ loading: true });

    this.props
      .updateUser(this.props.user)
      .then(() => this.props.navigation.setParams({ loading: false, editable: false }));
  };

  constructor() {
    super();
    this.state = {
      height: 20,
      modalVisible: false,
      socailAccountName: '',
      socailAccountUrl: ''
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      loading: this.props.loading,
      handleSave: this._handleSave,
      handleEdit: this._handleEdit,
      handleCancel: this._handleCancel,
      editable: this.props.editable,
      user: this.props.user,
      updateUser: this.props.updateUser,
      editUser: this.props.editUser,
      editUserCancel: this.props.editUserCancel,
      rightTitle: this.props.rightTitle
    });
  }

  componentWillUnmount() {
    this.props.userReset();
  }

  onAvatarChange = avatarUrl => {
    this.props.userAvatarChanged(avatarUrl);
  };
  onNameChange = name => {
    this.props.userNameChanged(name);
  };
  onSurnameChange = surname => {
    this.props.userSurnameChanged(surname);
  };
  onTelephoneChange = telephone => {
    this.props.userTelephoneChanged(telephone);
  };
  onEmailChange = email => {
    this.props.userEmailChanged(email);
  };
  onAddressChange = address => {
    this.props.userAddressChanged(address);
  };
  onAddressSizeChange = event => {
    this.setState({ height: event.nativeEvent.contentSize.height });
  };
  onSocialAccountsChange = socialAccount => {
    this.props.userSocialAccountsChanged(socialAccount);
  };

  onSocial(acc) {
    Alert.alert('Devam edilsin mi?', 'Sayfa cihazın web tarayıcısında açılacak.', [
      { text: 'İptal', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      {
        text: 'Evet',
        onPress: () => {
          Linking.canOpenURL(acc.url)
            .then(supported => {
              if (!supported) {
                console.log(`Can't handle url: ${acc.url}`);
              } else {
                return Linking.openURL(acc.url);
              }
            })
            .catch(err => console.error('An error occurred', err));
        }
      }
    ]);
  }

  checkSocial(url) {
    if (url.includes('www.facebook.com/')) {
      return { name: 'logo-facebook', color: '#4267b2' };
    } else if (url.includes('www.instagram.com/')) {
      return { name: 'logo-instagram', color: '#f50' };
    } else if (url.includes('www.twitter.com/')) {
      return { name: 'logo-twitter', color: '#1DA1F2' };
    }
    return { name: 'logo-twitter', color: '#1DA1F2' };
  }

  renderContactInfo(email, telephone, address) {
    const {
      contactInfoContainerStyle,
      contactPropStyle,
      contactPropContainerStyle,
      contactInfoStyle
    } = styles;
    return (
      <View>
        <CardItem
          style={{ backgroundColor: 'transparent', paddingLeft: 0, paddingBottom: 5 }}
          header
        >
          <Text style={{}}>İletişim Bilgileriniz</Text>
        </CardItem>
        <View style={{ paddingLeft: 17 }}>
          <View style={{ flexDirection: 'row' }}>
            <FormLabel
              style={({ marginRight: 0 }, contactPropContainerStyle)}
              labelStyle={contactPropStyle}
              containerStyle={contactPropContainerStyle}
            >
              Telefon
            </FormLabel>
            <FormInput
              inputStyle={[contactInfoStyle, { color: this.props.editable ? '#222' : '#999' }]}
              containerStyle={contactInfoContainerStyle}
              ref="form1"
              containerRef="telInputContainer"
              textInputRef="telInput"
              placeholder="555 545 5454"
              value={telephone}
              editable={this.props.editable}
              keyboardType="phone-pad"
              onChangeText={this.onTelephoneChange}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <FormLabel
              style={({ marginRight: 0 }, contactPropContainerStyle)}
              labelStyle={contactPropStyle}
              containerStyle={contactPropContainerStyle}
            >
              Email
            </FormLabel>
            <FormInput
              inputStyle={[contactInfoStyle, { color: this.props.editable ? '#222' : '#999' }]}
              containerStyle={contactInfoContainerStyle}
              ref="form2"
              containerRef="emailInputContainer"
              textInputRef="emailInput"
              placeholder="birisi@example.com"
              value={email}
              editable={this.props.editable}
              keyboardType="email-address"
              onChangeText={this.onEmailChange}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <FormLabel
              style={({ marginRight: 0 }, contactPropContainerStyle)}
              labelStyle={contactPropStyle}
              containerStyle={contactPropContainerStyle}
            >
              Adres
            </FormLabel>
            <FormInput
              inputStyle={[
                contactInfoStyle,
                { color: this.props.editable ? '#222' : '#999', marginTop: '3%' },
                { height: Math.max(10, this.state.height) }
              ]}
              containerStyle={contactInfoContainerStyle}
              ref="form3"
              containerRef="addressInputContainer"
              textInputRef="addressInput"
              placeholder="Adres"
              editable={this.props.editable}
              multiline
              value={address}
              onChangeText={this.onAddressChange}
              onContentSizeChange={this.onAddressSizeChange}
            />
          </View>
        </View>
      </View>
    );
  }

  renderTags(tags) {
    return tags.map((tag, i) => {
      return <Text key={i} style={styles.tagStyle}>{`#${tag} `}</Text>;
    });
  }

  onDeleteSocialAccount(i) {
    this.props.onSocialAccountDelete(i);
  }

  renderDeleteIcon = i => {
    if (this.props.editable) {
      return (
        <Icon
          style={{ marginLeft: 10, color: '#f22', fontSize: deviceWidth / 20 }}
          name="close-circle"
          onPress={this.onDeleteSocialAccount.bind(this, i)}
        />
      );
    }
  };

  renderSocialAcc(acc, i) {
    const { name, color } = this.checkSocial(acc.url);
    return (
      <CardItem
        key={i}
        style={{ paddingTop: 2, paddingBottom: 2, backgroundColor: 'transparent' }}
        button
        onPress={() => this.onSocial(acc)}
      >
        <Icon active name={name} style={{ color, paddingTop: 0, fontSize: deviceWidth / 20 }} />
        <Input
          style={[styles.inputStyle, { color: this.props.editable ? 'black' : 'grey' }]}
          editable={this.props.editable}
        >
          {acc.url}
        </Input>
        {this.renderDeleteIcon(i)}
      </CardItem>
    );
  }

  renderSocialAddIcon() {
    if (this.props.editable) {
      return (
        <Icon
          name="add-circle"
          style={{ flex: 1, color: 'steelblue', paddingHorizontal: 10, fontSize: deviceWidth / 20 }}
          onPress={() => this.setState({ modalVisible: true })}
        />
      );
    }
  }

  onChangeSocialAccountName = text => {
    this.setState({ socialAccountName: text });
  };

  onChangeSocialAccountUrl = text => {
    this.setState({ socialAccountUrl: text });
  };

  renderSocialMediaAccs() {
    return (
      <View>
        <Modal
          animationType="fade"
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}
        >
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              flexDirection: 'row',
              backgroundColor: '#0004'
            }}
          >
            <Form
              style={{ backgroundColor: '#eee', flex: 1, marginHorizontal: 10, borderRadius: 10 }}
            >
              <Item>
                <Input
                  value={this.state.socialAccountName}
                  onChangeText={this.onChangeSocialAccountName}
                  placeholder="İsim"
                />
              </Item>
              <Item last>
                <Input
                  value={this.state.socialAccountUrl}
                  onChangeText={this.onChangeSocialAccountUrl}
                  placeholder="URL"
                />
              </Item>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button transparent onPress={() => this.setState({ modalVisible: false })}>
                  <Text>İptal</Text>
                </Button>
                <Button
                  transparent
                  onPress={() => {
                    this.setState({ modalVisible: false });
                    this.onSocialAccountsChange({
                      site: this.state.socialAccountName,
                      url: this.state.socialAccountUrl
                    });
                  }}
                >
                  <Text>Ekle</Text>
                </Button>
              </View>
            </Form>
          </View>
        </Modal>
        <CardItem
          style={{ backgroundColor: 'transparent', paddingLeft: 0, paddingRight: 0 }}
          header
        >
          <Text style={{ flex: 9 }}>Sosyal Medya Hesapları</Text>
          {this.renderSocialAddIcon()}
        </CardItem>
        {this.props.user.socialAccounts.map((acc, i) => this.renderSocialAcc(acc, i))}
      </View>
    );
  }

  render() {
    const { address, email, name, surname, avatarUrl, tags, tcId, telephone } = this.props.user;
    return (
      <Container>
        <Content>
          <Thumbnail
            square
            blurRadius={1}
            source={{
              uri:
                'http://canadiancookingadventures.com/wp-content/uploads/2016/12/8ee1dac68e81aee04cc78b722e15fad8.jpg'
            }}
            style={styles.backgroundImage}
          />
          <View
            style={{
              backgroundColor: 'transparent',
              paddingVertical: '10%',
              justifyContent: 'center'
            }}
          >
            <View style={{ alignSelf: 'center', backgroundColor: '#fff2', borderRadius: 100 }}>
              <Thumbnail
                large
                blurRadius={1}
                source={{
                  uri:
                    avatarUrl ||
                    'http://www.oldpotterybarn.co.uk/wp-content/uploads/2015/06/default-medium.png'
                }}
              />
            </View>
            <View style={{ alignItems: 'center', marginTop: '5%' }}>
              <Text>{this.renderTags(tags)}</Text>
            </View>
          </View>
          <View
            style={{
              padding: 20,
              backgroundColor: '#fff',
              flex: 1
            }}
          >
            <Form style={{}}>
              <Item style={{ borderBottomWidth: 0, marginLeft: 0 }}>
                <Label style={{ fontSize: deviceWidth / 26, flex: 1, color: 'black' }}>İsim</Label>
                <Input
                  editable={this.props.editable}
                  style={[styles.inputStyle, { color: this.props.editable ? 'black' : 'grey' }]}
                  value={name}
                  onChangeText={this.onNameChange}
                />
              </Item>
              <Item style={{ borderBottomWidth: 0, marginLeft: 0, paddingTop: '3%' }}>
                <Label style={{ fontSize: deviceWidth / 26, flex: 1, color: 'black' }}>
                  Soyisim
                </Label>
                <Input
                  underlineColorAndroid="black"
                  editable={this.props.editable}
                  style={[styles.inputStyle, { color: this.props.editable ? 'black' : 'grey' }]}
                  value={surname}
                  onChangeText={this.onSurnameChange}
                />
              </Item>
            </Form>
            {this.renderContactInfo(email, telephone, address)}
            {this.renderSocialMediaAccs()}
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  tagStyle: {
    color: 'steelblue',
    marginBottom: 10
  },
  unvanStyle: {},
  contactPropContainerStyle: {
    flex: 1,
    marginRight: 0,
    paddingRight: 0
  },
  contactPropStyle: {
    color: '#000',
    fontWeight: '400',
    marginLeft: 0,
    marginRight: 0
  },
  contactInfoContainerStyle: {
    flex: 3,
    marginLeft: 0
  },
  contactInfoStyle: {
    fontSize: deviceWidth / 28,
    height: 20,
    width: 198,
    marginTop: 2
  },
  inputStyle: {
    fontSize: deviceWidth / 26,
    flex: 5,
    height: deviceWidth / 20,
    lineHeight: deviceWidth / 20,
    paddingBottom: 0,
    paddingTop: 0
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: deviceHeight / 3,
    
  }
});

const mapState = state => {
  const { user, editable, rightTitle, loading, backup } = state.user;
  return { user, editable, rightTitle, loading, backup };
};

export default connect(mapState, {
  userReset,
  editUser,
  editUserCancel,
  updateUser,
  userAvatarChanged,
  userNameChanged,
  userSurnameChanged,
  userTelephoneChanged,
  userEmailChanged,
  userAddressChanged,
  userSocialAccountsChanged,
  onSocialAccountDelete
})(Profile);
