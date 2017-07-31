import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ViewPropTypes,
  Keyboard,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Icon, Button } from 'react-native-elements';
import { CardSection } from '../src/components/common';

let pressed = false;

class SideMenu extends Component {
  constructor() {
    super();
    this.onProfil = this.onProfil.bind(this);
    this.onAnasayfa = this.onAnasayfa.bind(this);
    this.onIsTeklifleri = this.onIsTeklifleri.bind(this);
    this.onYeniKisiEkle = this.onYeniKisiEkle.bind(this);
    this.onYeniIsEkle = this.onYeniIsEkle.bind(this);
    this.onAyarlar = this.onAyarlar.bind(this);
    this.onAuth = this.onAuth.bind(this);
  }

  componentDidUpdate() {
    setTimeout(() => { pressed = false; }, 500);
  }

  onProfil() {
    if (!pressed) {
      pressed = true;
      Actions.profil();
    }
  }

  onAnasayfa() {
    if (!pressed) {
      pressed = true;
      Actions.anaSayfa();
    }
  }

  onIsTeklifleri() {
    if (!pressed) {
      pressed = true;
      Actions.isTeklifleri();
    }
  }

  onYeniKisiEkle() {
    if (!pressed) {
      pressed = true;
      Actions.yeniKisiEkle();
    }
  }

  onYeniIsEkle() {
    if (!pressed) {
      pressed = true;
      Actions.yeniIsEkle();
    }
  }

  onAyarlar() {
    if (!pressed) {
      pressed = true;
      Actions.ayarlar();
    }
  }

  onAuth() {
    if (!pressed) {
      firebase.auth().signOut()
        .then(() => {
          pressed = true;
          Actions.auth();
        });
    }
  }

  render() {
    return (
      <View style={[styles.viewContainer, this.props.sceneStyle]}>
        <CardSection style={{ paddingBottom: 0 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity
              style={styles.profilButtonContainer}
              onPress={this.onProfil}
            >
              <View style={{ justifyContent: 'center' }} >
                <Image
                  style={{ width: 55, height: 55 }}
                  source={{ uri: this.props.avatar }}
                />
              </View>
              <View style={{ justifyContent: 'center', paddingLeft: 10 }} >
                <Text style={styles.name}>{this.props.name} {this.props.surname}</Text>
                <Text style={{ color: '#aaa' }}>Graphic Designer</Text>
              </View>
              <View style={{ justifyContent: 'center', padding: 5 }}>
                <Icon
                  component={TouchableOpacity}
                  iconStyle={styles.logOutIconStyle}
                  name='sign-out'
                  type='font-awesome'
                  color='#f50'
                  onPress={this.onAuth}
                />
              </View>
            </TouchableOpacity>
          </View>
        </CardSection>

        <CardSection style={{ flexDirection: 'column', margin: 10, padding: 15, borderBottomWidth: 1, borderColor: '#222' }}>
          <Button
            Component={TouchableOpacity}
            icon={{ name: 'home', type: 'font-awesome', color: '#999', size: 28 }}
            title='Ana Sayfa'
            textStyle={styles.textStyle}
            backgroundColor="transparent"
            color="#555"
            buttonStyle={styles.buttonStyle}
            containerViewStyle={{ marginLeft: 0 }}
            onPress={this.onAnasayfa}
          />
          <Button
            Component={TouchableOpacity}
            icon={{ name: 'calendar-o', type: 'font-awesome', color: '#999', size: 28 }}
            title='İş Teklifleri'
            textStyle={styles.textStyle}
            backgroundColor="transparent"
            color="#555"
            buttonStyle={styles.buttonStyle}
            containerViewStyle={{ marginLeft: 0 }}
            onPress={this.onIsTeklifleri}
          />
          <Button
            Component={TouchableOpacity}
            icon={{ name: 'user-plus', type: 'font-awesome', color: '#999', size: 28 }}
            title='Yeni Kişi'
            textStyle={styles.textStyle}
            backgroundColor="transparent"
            color="#555"
            buttonStyle={styles.buttonStyle}
            containerViewStyle={{ marginLeft: 0 }}
            onPress={this.onYeniKisiEkle}
          />
          <Button
            Component={TouchableOpacity}
            icon={{ name: 'calendar-plus-o', type: 'font-awesome', color: '#999', size: 28 }}
            title='Yeni İş Teklifi'
            textStyle={styles.textStyle}
            backgroundColor="transparent"
            color="#555"
            buttonStyle={styles.buttonStyle}
            containerViewStyle={{ marginLeft: 0 }}
            onPress={this.onYeniIsEkle}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column', margin: 10, padding: 15, paddingTop: 0 }}>
          <Button
            Component={TouchableOpacity}
            icon={{ name: 'gear', type: 'font-awesome', color: '#999', size: 28 }}
            title='Ayarlar'
            textStyle={styles.textStyle}
            backgroundColor="transparent"
            color="#555"
            buttonStyle={styles.buttonStyle}
            containerViewStyle={{ marginLeft: 0 }}
            onPress={this.onAyarlar}
          />
        </CardSection>
      </View>
    );
  }
}

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#333'
  },
  profilButtonContainer: {
    paddingLeft: 15,
    paddingTop: 5,
    overflow: 'hidden',
    alignSelf: 'center',
    flexDirection: 'row'
  },
  logOutIconStyle: {
    padding: 20,
    alignSelf: 'center'
  },
  container: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  textStyle: {
    fontSize: 20,
    color: '#888',
  },
  name: {
    fontSize: 22,
    color: '#555',
    fontWeight: '400',
  },
  buttonStyle: {
    alignSelf: 'flex-start',
  }
});

SideMenu.contextTypes = contextTypes;
SideMenu.propTypes = propTypes;

const mapStateToProps = state => {
  const { name, surname, avatar } = state.data.user_id;

  return { name, surname, avatar };
};

export default connect(mapStateToProps)(SideMenu);
