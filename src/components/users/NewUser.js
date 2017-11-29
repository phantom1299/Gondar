import React, { Component } from 'react';
import { Text, View, Keyboard, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Container, Content, Form, Item, Label, Input } from 'native-base';
import { Card, Button, Icon } from 'react-native-elements';
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
    this.state = { tag: '', error: '' };
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
    if (name === '' || surname === '' || email === '' || password === '' || tags.length === 0) {
      this.setState({ error: 'Lütfen * ile belirtilmiş alanları doldurun!' });
    } else {
      this.props.newUserAdd(
        { name, email, password, surname, tags, loading },
        this.props.navigation.state.params.updateUsers
      );
    }
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
    if (this.state.error) {
      return (
        <View style={styles.errorContainerStyle}>
          <Icon name={'error'} color={'#D8000C'} />
          <Text style={styles.errorTextStyle}>{this.state.error}</Text>
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
      iconStyle,
      iconContainerStyle
    } = styles;
    return (
      <Container>
        <Content>
          <Card>
            <Form>
              {this.renderError()}
              <Item>
                <Label>*İsim</Label>
                <Input onChangeText={this.onNameChange} value={name} autoCapitalize="words" />
              </Item>
              <Item>
                <Label>*Soyisim</Label>
                <Input onChangeText={this.onSurnameChange} value={surname} autoCapitalize="words" />
              </Item>
              <Item>
                <Label>*Email</Label>
                <Input
                  onChangeText={this.onEmailChange}
                  value={email}
                  keyboardType="email-address"
                />
              </Item>
              <Item>
                <Label>*Şifre</Label>
                <Input secureTextEntry value={password} onChangeText={this.onPasswordChange} />
              </Item>
              <Item>
                <Label>*Etiket</Label>
                <Input value={this.state.tag} onChangeText={this.onTagChange} />
                <Icon
                  name={'add-circle'}
                  size={deviceWidth / 15}
                  color={'#28f'}
                  iconStyle={iconStyle}
                  containerStyle={iconContainerStyle}
                  onPress={this.onTagAdd}
                />
              </Item>
            </Form>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{this.renderTags()}</View>
            <CardSection>{this.renderButtonOrLoading()}</CardSection>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: deviceWidth / 28,
    alignSelf: 'center',
    color: '#D8000C',
    marginLeft: 5,
    padding: 5
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
