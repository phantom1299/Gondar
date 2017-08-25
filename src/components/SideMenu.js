import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, Text, ViewPropTypes, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Icon, Button, Avatar } from 'react-native-elements';
import { CardSection } from './common';

let pressed = false;

class SideMenu extends Component {
  constructor() {
    super();
    this.onProfil = this.onProfil.bind(this);
    this.onAnasayfa = this.onAnasayfa.bind(this);
    this.onIsTeklifleri = this.onIsTeklifleri.bind(this);
    this.onKisiler = this.onKisiler.bind(this);
    this.onYeniIsEkle = this.onYeniIsEkle.bind(this);
    this.onAyarlar = this.onAyarlar.bind(this);
    this.onLogout = this.onLogout.bind(this);
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

  onKisiler() {
    if (!pressed) {
      pressed = true;
      Actions.kisilerList({ type: 'replace' });
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

  onLogout() {
    if (!pressed) {
      pressed = true;
      Actions.auth({ type: 'reset' });
    }
  }

  render() {
    return (
      <View style={[styles.viewContainer, this.props.sceneStyle]}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginLeft: 10,
            padding: 10,
            justifyContent: 'space-around'
          }}
        >
          <TouchableOpacity style={styles.profilButtonContainer} onPress={this.onProfil}>
            <Avatar
              source={{
                uri:
                  'https://pbs.twimg.com/profile_images/2877768723/e32f9a8a76b9a41f89dce20832bf9b43_400x400.png'
              }}
              overlayContainerStyle={{ width: 70, height: 70, borderRadius: 35 }}
              containerStyle={{ width: 70, height: 70, borderRadius: 35 }}
              avatarStyle={{ width: 70, height: 70, borderRadius: 35 }}
            />
            <View style={{ justifyContent: 'center', paddingLeft: 15 }}>
              <Text style={styles.name}>Ashley Ford</Text>
              <Text style={{ color: '#aaa' }}>"Yönetici"</Text>
            </View>
          </TouchableOpacity>
          <View style={{ padding: 5 }}>
            <Icon
              component={TouchableOpacity}
              iconStyle={styles.logOutIconStyle}
              name="sign-out"
              type="font-awesome"
              color="#f50"
              onPress={this.onLogout}
            />
          </View>
        </View>

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
              name: 'dashboard',
              type: 'font-awesome',
              color: iconColor,
              size: 28
            }}
            title="Pano"
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
              name: 'tasks',
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
              name: 'users',
              type: 'font-awesome',
              color: iconColor,
              size: 28
            }}
            title="Kişiler"
            textStyle={styles.textStyle}
            backgroundColor="transparent"
            color="#555"
            buttonStyle={styles.buttonStyle}
            containerViewStyle={{ marginLeft: 0 }}
            onPress={this.onKisiler}
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
    flex: 1
  },
  profilButtonContainer: {
    flexDirection: 'row'
  },
  logOutIconStyle: {
    padding: 20
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
  const { isim, unvan, profilFotografiUrl } = state.user;
  return { isim, unvan, profilFotografiUrl };
};

export default connect(mapStateToProps)(SideMenu);
