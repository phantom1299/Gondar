import React, { Component } from 'react';
import { Keyboard, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Content, Button, Spinner, Form, Item, Label, Input, Text } from 'native-base';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';

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
      return <Spinner color="steelblue" />;
    }

    return (
      <Button style={styles.buttonStyle} iconRight rounded block onPress={this.onButtonPress}>
        <Text style={styles.textStyle}>Giriş Yap</Text>
        <Icon name="sign-in" size={28} />
      </Button>
    );
  }
  // <Image
  //   source={{
  //     uri:
  //       'https://s-media-cache-ak0.pinimg.com/originals/f0/00/4d/f0004d555447885c1d24e89afe58ad6e.jpg'
  //   }}
  //   style={styles.backgroundImage}
  // />
  render() {
    return (
      <Container>
        <Image
          source={{
            uri:
              'http://iphonewallpaperhd.org/wp-content/uploads/2015/08/cool-wallpapers-for-iphone-6-plus-1080x1920-highway-blures.jpg'
          }}
          style={styles.backgroundImage}
        />
        <Content style={{ paddingTop: '20%' }}>
          <Image
            source={require('./../../img/picturetopeople.org-7f0cbca054fd418cb65f8c80d9c5d973d2203920f3c044a386.png')}
            style={{ width: 300, resizeMode: 'contain', alignSelf: 'center' }}
          />
          <Form
            style={{
              padding: 10,
              marginRight: '8%',
              margin: 10,
              paddingBottom: 30,
              opacity: 0.8,
              borderRadius: 10
            }}
          >
            <Item inlineLabel>
              <Label
                style={{
                  color: '#fff'
                }}
              >
                Email
              </Label>
              <Input onChangeText={this.onEmailChange} value={this.props.email} placeholder="birisi@örnek.com" placeholderTextColor="#fffa" />
            </Item>
            <Item inlineLabel>
              <Label
                style={{
                  color: '#fff'
                }}
              >
                Şifre
              </Label>
              <Input
                secureTextEntry
                onChangeText={this.onPasswordChange}
                value={this.props.password}
              />
            </Item>
          </Form>
          <Text style={styles.errosTextStyle}>{this.props.error}</Text>
          {this.renderButton()}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  errosTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  buttonStyle: {
    backgroundColor: '#afeeeeaa',
    marginHorizontal: '10%'
  },
  textStyle: {
    fontSize: 18,
    marginRight: 10
  },
  backgroundImage: {
    backgroundColor: '#ccc',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center'
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
