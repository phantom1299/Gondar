import React, { Component } from 'react';
import { Text, View, Keyboard, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Container, Content } from 'native-base';
import { Card, Button, FormLabel, FormInput, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import {
  newUserAdd,
  newUserNameChanged,
  newUserSurnameChanged,
  newUserEmailChanged,
  newUserPasswordChanged,
  newUserFormWillMount
} from '../../actions';
import { CardSection, Spinner } from '../common';

const deviceWidth = Dimensions.get('window').width;

class NewUser extends Component {
  static navigationOptions = ({ navigation }) => {
    const headerRight = <View />;
    return {
      headerStyle: { backgroundColor: '#4C3E54' },
      headerTintColor: 'white',
      headerTitle: 'Yeni Kişi Oluştur',
      headerTitleStyle: { alignSelf: 'center', fontSize: deviceWidth / 26 },
      headerRight
    };
  };
  constructor() {
    super();
    this.onNameChange = this.onNameChange.bind(this);
    this.onSurnameChange = this.onSurnameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onTagChange = this.onTagChange.bind(this);
    this.onTagAdd = this.onTagAdd.bind(this);
    this.onTagDelete = this.onTagDelete.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.state = { tag: '' };
  }

  componentWillMount() {
    this.props.newUserFormWillMount();
    Keyboard.dismiss();
  }

  onNameChange(name) {
    this.props.newUserNameChanged(name);
  }

  onSurnameChange(surname) {
    this.props.newUserSurnameChanged(surname);
  }

  onEmailChange(email) {
    this.props.newUserEmailChanged(email);
  }

  onPasswordChange(password) {
    this.props.newUserPasswordChanged(password);
  }

  onTagChange(tag) {
    this.setState({ tag });
  }

  onTagAdd() {
    Keyboard.dismiss();
    if (this.state.tag !== '') {
      this.props.tags.push(this.state.tag);
    }
    this.setState({ tag: '' });
  }

  onTagDelete(i) {
    this.props.tags.splice(i, 1);
    this.forceUpdate();
  }

  onButtonPress() {
    Keyboard.dismiss();
    const { name, email, password, loading, surname, tags } = this.props;
    this.props.newUserAdd({ name, email, password, surname, tags, loading });
  }

  renderTags() {
    return this.props.tags.map((tag, i) => {
      return (
        <Card flexDirection={'row'} containerStyle={styles.tagContainerStyle} key={i}>
          <Text style={styles.tagStyle}>{`#${tag}`}</Text>
          <Icon
            Component={TouchableOpacity}
            name={'clear'}
            size={20}
            onPress={this.onTagDelete.bind(this, i)}
            color={'#000'}
          />
        </Card>
      );
    });
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={styles.errorContainerStyle}>
          <Icon name={'error'} color={'#D8000C'} />
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  }

  renderButtonOrLoading() {
    if (this.props.loading) {
      return <Spinner />;
    }

    return (
      <View style={{ flex: 1, marginTop: 20 }}>
        <Button
          raised
          icon={{ name: 'person-add' }}
          title="EKLE"
          onPress={this.onButtonPress}
          backgroundColor={'#397af8'}
        />
      </View>
    );
  }

  render() {
    const { name, email, password, surname } = this.props;
    const {
      labelStyle,
      labelContainerStyle,
      inputStyle,
      inputContainerStyle,
      iconStyle,
      iconContainerStyle,
      tagInputStyle
    } = styles;
    return (
      <Container>
        <Content>
          <Card>
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
              <FormLabel labelStyle={labelStyle} containerStyle={labelContainerStyle}>
                İsim
              </FormLabel>
              <FormInput
                inputStyle={inputStyle}
                containerStyle={inputContainerStyle}
                ref="form1"
                containerRef="nameInputContainer"
                textInputRef="nameInput"
                onChangeText={this.onNameChange}
                value={name}
                autoCapitalize="words"
              />
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
              <FormLabel labelStyle={labelStyle} containerStyle={labelContainerStyle}>
                Soyisim
              </FormLabel>
              <FormInput
                inputStyle={inputStyle}
                containerStyle={inputContainerStyle}
                ref="form1"
                containerRef="surnameInputContainer"
                textInputRef="surnameInput"
                value={surname}
                onChangeText={this.onSurnameChange}
              />
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
              <FormLabel labelStyle={labelStyle} containerStyle={labelContainerStyle}>
                Email
              </FormLabel>
              <FormInput
                inputStyle={inputStyle}
                containerStyle={inputContainerStyle}
                ref="form1"
                containerRef="emailInputContainer"
                textInputRef="emailInput"
                onChangeText={this.onEmailChange}
                value={email}
                keyboardType="email-address"
              />
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
              <FormLabel labelStyle={labelStyle} containerStyle={labelContainerStyle}>
                Şifre
              </FormLabel>
              <FormInput
                secureTextEntry
                inputStyle={inputStyle}
                containerStyle={inputContainerStyle}
                ref="form1"
                containerRef="passwordInputContainer"
                textInputRef="passwordInput"
                value={password}
                onChangeText={this.onPasswordChange}
              />
            </View>
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
              <FormLabel labelStyle={labelStyle}>Etiket</FormLabel>
              <FormInput
                inputStyle={tagInputStyle}
                ref="form1"
                containerRef="tagInputContainer"
                textInputRef="tagInput"
                value={this.state.tag}
                onChangeText={this.onTagChange}
              />
              <Icon
                name={'add-circle'}
                size={deviceWidth / 15}
                color={'#28f'}
                iconStyle={iconStyle}
                containerStyle={iconContainerStyle}
                onPress={this.onTagAdd}
              />
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{this.renderTags()}</View>
            {this.renderError()}
            <CardSection>{this.renderButtonOrLoading()}</CardSection>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: deviceWidth / 18,
    alignSelf: 'center',
    color: '#D8000C',
    marginLeft: 5
  },
  errorContainerStyle: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 20,
    padding: 5,
    borderRadius: 8,
    backgroundColor: '#FFBABA',
    justifyContent: 'center'
  },
  labelStyle: {
    fontSize: deviceWidth / 28,
    fontWeight: '200',
    color: '#777',
    marginRight: 0,
    paddingRight: 0
  },
  labelContainerStyle: {
    flex: 1
  },
  inputContainerStyle: {
    flex: 3,
    marginLeft: 0
  },
  inputStyle: {
    fontSize: deviceWidth / 28,
    height: 20,
    color: '#888',
    marginTop: 2,
    width: '100%'
  },
  tagInputStyle: {
    fontSize: deviceWidth / 28,
    height: 20,
    width: 150,
    color: '#888',
    marginTop: 2
  },
  iconStyle: {
    justifyContent: 'center'
  },
  iconContainerStyle: {
    marginTop: '4%'
  },
  tagStyle: {
    fontSize: deviceWidth / 30,
    color: 'white',
    marginRight: 5
  },
  tagContainerStyle: {
    marginRight: 4,
    marginLeft: 8,
    padding: 8,
    elevation: 1,
    backgroundColor: '#228b22aa',
    borderRadius: 8
  }
});

const mapStateToProps = ({ newUserForm }) => {
  const { name, surname, email, password, tags, error, loading } = newUserForm;

  return { name, surname, email, password, tags, error, loading };
};

export default connect(mapStateToProps, {
  newUserAdd,
  newUserEmailChanged,
  newUserNameChanged,
  newUserSurnameChanged,
  newUserPasswordChanged,
  newUserFormWillMount
})(NewUser);
