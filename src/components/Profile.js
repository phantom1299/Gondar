import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Linking, Alert, Modal } from 'react-native';
import { Card as Card1, ListItem, FormLabel, FormInput, Avatar } from 'react-native-elements';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Button,
  Form,
  Item,
  Input
} from 'native-base';

const data = [
  {
    site: 'facebook',
    url: 'https://www.facebook.com/muhammedbahaeddin.aydemir'
  },
  {
    site: 'instagram',
    url: 'https://www.instagram.com/muhammedbahaeddinaydemir/'
  },
  {
    site: 'twitter',
    url: 'https://www.twitter.com/muhammedbahaeddinaydemir/'
  }
];

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

class Profile extends Component {
  constructor() {
    super();
    console.log(this.props);
    this.state = {
      height: 0,
      modalVisible: false
    };
  }

  componentWillMount() {
    console.log(this.props);
  }

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
    if (url.includes('facebook')) {
      return { name: 'logo-facebook', color: '#4267b2' };
    } else if (url.includes('instagram')) {
      return { name: 'logo-instagram', color: '#f50' };
    } else if (url.includes('twitter')) {
      return { name: 'logo-twitter', color: '#1DA1F2' };
    }
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
          <Text style={{ fontSize: 18 }}>İletişim Bilgileriniz</Text>
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
              inputStyle={contactInfoStyle}
              containerStyle={contactInfoContainerStyle}
              ref="form1"
              containerRef="telInputContainer"
              textInputRef="telInput"
              placeholder="555 545 5454"
              value={telephone}
              editable={this.props.editable}
              keyboardType="phone-pad"
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
              inputStyle={contactInfoStyle}
              containerStyle={contactInfoContainerStyle}
              ref="form2"
              containerRef="emailInputContainer"
              textInputRef="emailInput"
              placeholder="birisi@example.com"
              value={email}
              editable={this.props.editable}
              keyboardType="email-address"
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
              inputStyle={contactInfoStyle}
              containerStyle={contactInfoContainerStyle}
              ref="form3"
              containerRef="addressInputContainer"
              textInputRef="addressInput"
              placeholder="Adres"
              editable={this.props.editable}
              multiline
              value={address}
              onChangeText={text => {
                this.setState({ text });
              }}
              onContentSizeChange={event => {
                this.setState({ height: event.nativeEvent.contentSize.height });
              }}
              style={[{ marginTop: 4 }, { height: Math.max(10, this.state.height) }]}
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

  renderDeleteIcon(i) {
    if (this.props.editable) {
      return (
        <Icon
          style={{ marginLeft: 10, color: '#f22' }}
          name="close-circle"
          onPress={() => console.log(i)}
        />
      );
    }
  }

  renderSocialAcc(acc, i) {
    const { name, color } = this.checkSocial(acc.url);
    return (
      <CardItem
        key={i}
        style={{ paddingTop: 2, paddingBottom: 2, backgroundColor: 'transparent' }}
        button
        onPress={() => this.onSocial(acc)}
      >
        <Icon active name={name} style={{ color, paddingTop: 0 }} />
        <Input style={{ fontSize: 14, marginBottom: 3 }} editable={this.props.editable}>
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
          style={{ flex: 1, color: 'steelblue', paddingHorizontal: 10 }}
          onPress={() => this.setState({ modalVisible: true })}
        />
      );
    }
  }

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
                <Input placeholder="İsim" />
              </Item>
              <Item last>
                <Input placeholder="URL" />
              </Item>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button transparent onPress={() => this.setState({ modalVisible: false })}>
                  <Text>İptal</Text>
                </Button>
                <Button transparent onPress={() => this.setState({ modalVisible: false })}>
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
          <Text style={{ fontSize: 18, flex: 9 }}>Sosyal Medya Hesapları</Text>
          {this.renderSocialAddIcon()}
        </CardItem>
        {data.map((acc, i) => this.renderSocialAcc(acc, i))}
      </View>
    );
  }

  render() {
    const {
      address,
      email,
      name,
      surname,
      avatarUrl,
      tags,
      tcId,
      telephone,
    } = this.props.kullanici;
    const { nameStyle } = styles;
    return (
      <Container>
        <Content>
          <Card1
            style={{
              padding: 0,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.5,
              elevation: 1
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                padding: 20,
                paddingBottom: 40,
                paddingTop: 40,
                backgroundColor: 'deepskyblue'
              }}
            >
              <View style={{ marginRight: 20, flex: 1, alignSelf: 'center' }}>
                <Avatar
                  rounded
                  large
                  showEditButton
                  onEditPress={() => console.log('Works!')}
                  title="BK"
                  source={{ uri: avatarUrl }}
                  overlayContainerStyle={{ width: 100, height: 100, borderRadius: 50 }}
                  containerStyle={{ width: 100, height: 100, borderRadius: 50 }}
                  avatarStyle={{ width: 100, height: 100, borderRadius: 50 }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  flex: 2,
                  justifyContent: 'space-around'
                }}
              >
                <Text style={nameStyle}>{name}</Text>
                <Text style={nameStyle}>{surname}</Text>
                <Text>{this.renderTags(tags)}</Text>
              </View>
            </View>
          </Card1>
          <Card1
            style={{
              marginTop: 0,
              padding: 20,
              backgroundColor: '#00a5b533',
              borderTopWidth: 0,
              flex: 1
            }}
          >
            {this.renderContactInfo(email, telephone, address)}
            {this.renderSocialMediaAccs()}
          </Card1>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  nameStyle: {
    fontSize: 24,
    marginTop: 10
  },
  tagStyle: {
    color: 'steelblue',
    fontSize: 16,
    marginBottom: 10
  },
  unvanStyle: {
    fontSize: 20
  },
  contactPropContainerStyle: {
    flex: 1,
    marginRight: 0,
    paddingRight: 0
  },
  contactPropStyle: {
    fontSize: 16,
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
    fontSize: 16,
    height: 20,
    width: 198,
    color: '#888',
    marginTop: 2
  }
});

export default Profile;
