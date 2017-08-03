import React, { Component } from 'react';
import { Text, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import {
  newUserAdd,
  newUserNameChanged,
  newUserEmailChanged,
  newUserPasswordChanged,
  newUserPassword2Changed,
  newUserFormWillMount
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class KisiEkle extends Component {
  componentWillMount() {
    this.props.newUserFormWillMount();
  }

  componentWillUnmount() {
    Keyboard.dismiss();
  }

  onNameChange(isim) {
    this.props.newUserNameChanged(isim);
  }

  onEmailChange(email) {
    this.props.newUserEmailChanged(email);
  }

  onPasswordChange(sifre) {
    this.props.newUserPasswordChanged(sifre);
  }

  onPassword2Change(sifre2) {
    this.props.newUserPassword2Changed(sifre2);
  }

  onButtonPress() {
    Keyboard.dismiss();
    const { isim, email, sifre } = this.props;
    this.props.newUserAdd({ isim, email, sifre });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }

    return <Button onPress={this.onButtonPress.bind(this)}>Ekle</Button>;
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="İsim"
            placeholder="Kullanıcının ismini giriniz"
            onChangeText={this.onNameChange.bind(this)}
            value={this.props.name}
            autoCapitalize="words"
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Email"
            placeholder="Kullanıcının Emailini giriniz"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
            keyboardType="email-address"
          />
        </CardSection>
        <CardSection style={{ borderBottomWidth: 0 }}>
          <Input
            secureTextEntry
            label="Şifre"
            placeholder="Kullanıcının şifresini giriniz"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            placeholder="Şifreyi tekrar giriniz"
            onChangeText={this.onPassword2Change.bind(this)}
            value={this.props.password2}
          />
        </CardSection>
        <Text style={styles.errosTextStyle}>
          {this.props.error}
        </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errosTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ newUserForm }) => {
  const { name, email, password, password2, error, loading } = newUserForm;

  return { name, email, password, password2, error, loading };
};

export default connect(mapStateToProps, {
  newUserAdd,
  newUserEmailChanged,
  newUserNameChanged,
  newUserPasswordChanged,
  newUserPassword2Changed,
  newUserFormWillMount
})(KisiEkle);
