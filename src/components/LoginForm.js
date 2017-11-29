import React, { Component } from 'react';
import { Keyboard, Image, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Content, Button, Spinner, Form, Item, Label, Input, Text } from 'native-base';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';

const deviceWidth = Dimensions.get('window').width;

class LoginForm extends Component {
  constructor() {
    super();
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  componentWillUnmount() {
    Keyboard.dismiss();
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    Keyboard.dismiss();
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size={45} color="steelblue" />;
    }

    return (
      <Button
        disabled={this.props.email === '' || this.props.password === ''}
        style={styles.buttonStyle}
        iconRight
        block
        onPress={this.onButtonPress}
      >
        <Text style={{ fontSize: deviceWidth / 26 }}>Giriş Yap</Text>
        <Icon name="sign-in" size={28} />
      </Button>
    );
  }
  render() {
    return (
      <Container style={{ justifyContent: 'center' }}>
        <Image
          source={{
            uri:
              'http://iphonewallpaperhd.org/wp-content/uploads/2015/08/cool-wallpapers-for-iphone-6-plus-1080x1920-highway-blures.jpg'
          }}
          style={styles.backgroundImage}
        />
        <Content
          contentContainerStyle={{ flex: 1, justifyContent: 'center', paddingBottom: '10%' }}
        >
          <Image
            source={require('./../../img/picturetopeople.org-7f0cbca054fd418cb65f8c80d9c5d973d2203920f3c044a386.png')}
            style={{ width: '70%', marginBottom: '5%', resizeMode: 'contain', alignSelf: 'center' }}
          />
          <Form
            style={{
              padding: 10,
              marginRight: '8%',
              marginLeft: '6%',
              margin: 10,
              paddingBottom: 30,
              borderRadius: 10
            }}
          >
            <Item inlineLabel>
              <Label style={[styles.textStyle, { color: '#fff', flex: 1 }]}>Email</Label>
              <Input
                editable={!this.props.loading}
                onChangeText={this.onEmailChange}
                keyboardType="email-address"
                value={this.props.email}
                placeholder="birisi@örnek.com"
                placeholderTextColor="#fffa"
                style={[styles.textStyle, { opacity: this.props.loading ? 0.7 : 1 }]}
              />
            </Item>
            <Item inlineLabel>
              <Label style={[styles.textStyle, { color: '#fff', flex: 1 }]}>Şifre</Label>
              <Input
                editable={!this.props.loading}
                secureTextEntry
                onChangeText={this.onPasswordChange}
                value={this.props.password}
                style={[styles.textStyle, { opacity: this.props.loading ? 0.7 : 1 }]}
              />
              {/* {Object.prototype.} */}
            </Item>
          </Form>
          {/* <Text style={styles.errosTextStyle}>{this.props.error}</Text> */}
          {this.renderButton()}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  errosTextStyle: {
    fontSize: deviceWidth / 28,
    alignSelf: 'center',
    color: 'red',
    backgroundColor: '#326459a5'
  },
  buttonStyle: {
    backgroundColor: '#afeeeeaa',
    marginHorizontal: '25%',
    padding: 0,
    marginTop: 35,
    borderRadius: 15
  },
  textStyle: {
    fontSize: deviceWidth / 26,
    marginRight: 10,
    flex: 5
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser
})(LoginForm);
