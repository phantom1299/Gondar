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
  componentDidMount() { Actions.refresh({ key: 'drawer', ref: this.refs.navigation }); }
  render() {
    return (
      <View style={[styles.viewContainer, this.props.sceneStyle]}>
        <CardSection style={{ flexDirection: 'column', padding: 30 }}>
          <Button
            containerStyle={styles.container}
            style={styles.name}
            onPress={() => { Actions.profil(); }}
          >{this.props.name} {this.props.surname}</Button>
        </CardSection>
        <CardSection style={{ flexDirection: 'column' }}>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
            onPress={() => { Actions.anaSayfa(); }}
          >Ana Sayfa</Button>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
            onPress={() => { Actions.isTeklifleri(); }}
          >İş Teklifleri</Button>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
            onPress={() => { Actions.yeniKisiEkle(); }}
          >Kişi Ekle</Button>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
            onPress={() => { Actions.yeniIsEkle(); }}
          >İş Teklifi Ekle</Button>
        </CardSection>
        <CardSection style={{ flexDirection: 'column', borderBottomWidth: 0, }}>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
            onPress={() => Actions.ayarlar()}
          >Ayarlar</Button>
          <Button
            containerStyle={styles.container}
            style={styles.textStyle}
            onPress={() => {
              firebase.auth().signOut()
                .then(() => {
                  Actions.auth();
                });
            }}
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
