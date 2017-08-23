import React, { Component } from 'react';
import { Text, Keyboard, Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Button, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input } from './common';

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
      return <Spinner />;
    }

    return (
      <Button style={{ marginHorizontal: 10 }} iconRight rounded block info onPress={this.onButtonPress}>
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
        <Content>
          <Image
            source={require('./../../img/picturetopeople.org-9dc41589dd48d7450e4615abb9c928fcf1d754a0abecc5bd42.png')}
            style={{ width: 300, resizeMode: 'contain', alignSelf: 'center' }}
          />
          <CardSection
            style={{ backgroundColor: '#aaa', opacity: 0.8, borderRadius: 8, marginBottom: 1 }}
          >
            <Input
              label="Email"
              labelStyle={{ color: '#fff' }}
              inputStyle={{ color: '#fff' }}
              placeholder="user@example.com"
              onChangeText={this.onEmailChange}
              value={this.props.email}
            />
          </CardSection>

          <CardSection style={{ backgroundColor: '#aaa', opacity: 0.8, borderRadius: 8 }}>
            <Input
              secureTextEntry
              label="Sifre"
              labelStyle={{ color: '#fff' }}
              inputStyle={{ color: '#fff' }}
              placeholder="password"
              onChangeText={this.onPasswordChange}
              value={this.props.password}
            />
          </CardSection>
          <Text style={styles.errosTextStyle}>
            {this.props.error}
          </Text>
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
  buttonStyle: {},
  textStyle: {
    fontSize: 18,
    marginRight: 10
  },
  backgroundImage: {
    backgroundColor: '#ccc',
    flex: 1,
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
