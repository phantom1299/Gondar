import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import { StyleSheet, View, Text, Image, ViewPropTypes } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import { CardSection } from '../src/components/common';

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

  // componentDidMount() { Actions.refresh({ key: 'drawer', ref: this.refs.navigation }); }

  onProfil() {
    Actions.profil();
  }
  onAnasayfa() {
    Actions.anasayfa();
  }
  onIsTeklifleri() {
    Actions.isTeklifleri();
  }
  onYeniKisiEkle() {
    Actions.yeniKisiEkle();
  }
  onYeniIsEkle() {
    Actions.yeniIsEkle();
  }
  onAyarlar() {
    Actions.ayarlar();
  }
  onAuth() {
    firebase.auth().signOut()
      .then(() => {
        Actions.auth();
      });
  }

  render() {
    return (
      <View style={[styles.viewContainer, this.props.sceneStyle]}>
        <CardSection style={{ flexDirection: 'column', paddingBottom: 10 }}>
          <View style={{ flexDirection: 'row', paddingLeft: 10, paddingTop: 10 }}>
            <Button
              containerStyle={styles.profilButtonContainer}
              style={styles.name}
              onPress={this.onProfil}
            >
              <Image
                style={{ width: 55, height: 55 }}
                source={{ uri: this.props.avatar }}
              />
              <View style={{ justifyContent: 'center', paddingLeft: 10 }} >
                <Text style={styles.name}>{this.props.name} {this.props.surname}</Text>
                <Text style={{ color: '#aaa' }}>Graphic Designer</Text>
              </View>
              <View>
                <Button
                  containerStyle={styles.logOutButtonContainer}
                  style={styles.logOutButtonText}
                  onPress={this.onAuth}
                >Çıkış Yap</Button>
              </View>
            </Button>
          </View>
        </CardSection>

        <CardSection style={{ flexDirection: 'column', padding: 15 }}>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
            onPress={this.onAnasayfa}
          >Ana Sayfa</Button>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
            onPress={this.onIsTeklifleri}
          >İş Teklifleri</Button>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
            onPress={this.onYeniKisiEkle}
          >Kişi Ekle</Button>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
            onPress={this.onYeniIsEkle}
          >İş Teklifi Ekle</Button>
        </CardSection>

        <CardSection style={{ flexDirection: 'column', borderBottomWidth: 0, padding: 15 }}>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
            onPress={this.onAyarlar}
          >Ayarlar</Button>
          {/* <Button
            containerStyle={styles.container}
            style={styles.textStyle}
          >Log</Button> */}
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
    backgroundColor: '#ddd'
  },
  profilButtonContainer: {
    paddingLeft: 15,
    paddingTop: 5,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  logOutButtonContainer: {
    paddingLeft: 15,
    bottom: 15
  },
  logOutButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  container: {
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  textStyle: {
    fontSize: 18,
    color: '#555',
  },
  nameContainer: {
    padding: 15,
    height: 45,
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  name: {
    fontSize: 22,
    color: '#555',
    fontWeight: '400',
  }
});

SideMenu.contextTypes = contextTypes;
SideMenu.propTypes = propTypes;

const mapStateToProps = state => {
  const { name, surname, avatar } = state.data.user_id;

  return { name, surname, avatar };
};

export default connect(mapStateToProps)(SideMenu);
