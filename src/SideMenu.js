import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import { StyleSheet, View, Text, ViewPropTypes, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Icon, Button, Avatar } from 'react-native-elements';
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
  //TODO
  componentDidUpdate() {
    setTimeout(() => {
      pressed = false;
    }, 500);
  }

  onProfil() {
    if (!pressed) {
      pressed = true;
      Actions.profil({ type: 'replace' });
    }
  }

  onAnasayfa() {
    if (!pressed) {
      pressed = true;
      Actions.anaSayfa({ type: 'replace' });
    }
  }

  onIsTeklifleri() {
    if (!pressed) {
      pressed = true;
      Actions.isTeklifleri({ type: 'replace' });
    }
  }

  onYeniKisiEkle() {
    if (!pressed) {
      pressed = true;
      Actions.yeniKisiEkle({ type: 'replace' });
    }
  }

  onYeniIsEkle() {
    if (!pressed) {
      pressed = true;
      Actions.yeniIsEkle({ type: 'replace' });
    }
  }

  onAyarlar() {
    if (!pressed) {
      pressed = true;
      Actions.ayarlar({ type: 'replace' });
    }
  }

  onAuth() {
    if (!pressed) {
      firebase.auth().signOut().then(() => {
        pressed = true;
        Actions.auth({ type: 'reset' });
      });
    }
  }

  render() {
    console.log(this.props);
    return (
      <View style={[styles.viewContainer, this.props.sceneStyle]}>
        <CardSection style={{ paddingBottom: 0 }}>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <TouchableOpacity style={styles.profilButtonContainer} onPress={this.onProfil}>
              <View style={{ justifyContent: 'center' }}>
                <Avatar
                  source={{ uri: this.props.profilFotografiUrl }}
                  overlayContainerStyle={{ width: 70, height: 70, borderRadius: 35 }}
                  containerStyle={{ width: 70, height: 70, borderRadius: 35 }}
                  avatarStyle={{ width: 70, height: 70, borderRadius: 35 }}
                />
              </View>
              <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
                <Text style={styles.name}>
                  {this.props.isim}
                </Text>
                <Text style={{ color: '#aaa' }}>
                  {this.props.unvan}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', padding: 5 }}>
              <Icon
                component={TouchableOpacity}
                iconStyle={styles.logOutIconStyle}
                name="sign-out"
                type="font-awesome"
                color="#f50"
                onPress={this.onAuth}
              />
            </View>
          </View>
        </CardSection>

        <CardSection
          style={{
            flexDirection: 'column',
            margin: 10,
            marginTop: 0,
            padding: 15,
            borderBottomWidth: 1,
            borderColor: '#222'
          }}
        >
          <Button
            Component={TouchableOpacity}
            icon={{
              name: 'home',
              type: 'font-awesome',
              color: iconColor,
              size: 28
            }}
            title="Ana Sayfa"
            textStyle={styles.textStyle}
            backgroundColor="transparent"
            color="#555"
            buttonStyle={styles.buttonStyle}
            containerViewStyle={{ marginLeft: 0 }}
            onPress={this.onAnasayfa}
          />
          <Button
            Component={TouchableOpacity}
            icon={{
              name: 'calendar-o',
              type: 'font-awesome',
              color: iconColor,
              size: 28
            }}
            title="İş Teklifleri"
            textStyle={styles.textStyle}
            backgroundColor="transparent"
            color="#555"
            buttonStyle={styles.buttonStyle}
            containerViewStyle={{ marginLeft: 0 }}
            onPress={this.onIsTeklifleri}
          />
          <Button
            Component={TouchableOpacity}
            icon={{
              name: 'user-plus',
              type: 'font-awesome',
              color: iconColor,
              size: 28
            }}
            title="Yeni Kişi"
            textStyle={styles.textStyle}
            backgroundColor="transparent"
            color="#555"
            buttonStyle={styles.buttonStyle}
            containerViewStyle={{ marginLeft: 0 }}
            onPress={this.onYeniKisiEkle}
          />
          <Button
            Component={TouchableOpacity}
            icon={{
              name: 'calendar-plus-o',
              type: 'font-awesome',
              color: iconColor,
              size: 28
            }}
            title="Yeni İş Teklifi"
            textStyle={styles.textStyle}
            backgroundColor="transparent"
            color="#555"
            buttonStyle={styles.buttonStyle}
            containerViewStyle={{ marginLeft: 0 }}
            onPress={this.onYeniIsEkle}
          />
        </CardSection>

        <CardSection
          style={{
            flexDirection: 'column',
            margin: 10,
            padding: 15,
            paddingTop: 0
          }}
        >
          <Button
            Component={TouchableOpacity}
            icon={{
              name: 'gear',
              type: 'font-awesome',
              color: iconColor,
              size: 28
            }}
            title="Ayarlar"
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

const iconColor = '#555';

const contextTypes = {
  drawer: React.PropTypes.object
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: ViewPropTypes.style,
  title: PropTypes.string
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: '#ddd'
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
    alignSelf: 'flex-start'
  },
  textStyle: {
    fontSize: 20,
    color: '#888'
  },
  name: {
    fontSize: 22,
    color: '#666',
    fontWeight: '600'
  },
  buttonStyle: {
    alignSelf: 'flex-start'
  }
});

SideMenu.contextTypes = contextTypes;
SideMenu.propTypes = propTypes;

const mapStateToProps = state => {
  const { isim, unvan, profilFotografiUrl } = state.user.kullanici;

  return { isim, unvan, profilFotografiUrl };
};

export default connect(mapStateToProps)(SideMenu);
