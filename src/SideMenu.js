import React, { Component, PropTypes } from 'react';
import firebase from 'firebase';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';
import { CardSection } from '../src/components/common';

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
    backgroundColor: '#fff'
  },
  container: {
    padding: 15,
    height: 45,
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
        <CardSection style={{ flexDirection: 'column', padding: 30 }}>
          <Button
            containerStyle={styles.container}
            style={styles.name}
            onPress={this.onProfil}
          >{this.props.name} {this.props.surname}</Button>
        </CardSection>
        <CardSection style={{ flexDirection: 'column' }}>
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
        <CardSection style={{ flexDirection: 'column', borderBottomWidth: 0, }}>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
            onPress={this.onAyarlar}
          >Ayarlar</Button>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
            onPress={this.onAuth}
          >Çıkış Yap</Button>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
          >Log</Button>
        </CardSection>
      </View>
    );
  }
}

SideMenu.contextTypes = contextTypes;
SideMenu.propTypes = propTypes;

const mapStateToProps = state => {
  const { name, surname } = state.data.user_id;

  return { name, surname };
};

export default connect(mapStateToProps)(SideMenu);
