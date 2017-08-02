import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Avatar, Divider } from 'react-native-elements';

class Profil extends Component {
  constructor() {
    super();
    this.onEditContact = this.onEditContact.bind(this);
  }

  onEditContact() {}

  renderTags(tags) {
    return tags.map((tag, i) => {
      return <Text key={i}>{`#${tag} `}</Text>;
    });
  }

  render() {
    const {
      adres,
      email,
      isim,
      profilFotografiUrl,
      tags,
      tcKimlikNo,
      telefon,
      unvan
    } = this.props.kullanici;
    const {
      nameStyle,
      tagsStyle,
      contactPropStyle,
      unvanStyle,
      contactInfoStyle
    } = styles;
    return (
      <Card>
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <View style={{ marginRight: 20, flex: 1, alignSelf: 'center' }}>
            <Avatar
              rounded
              large
              showEditButton
              onEditPress={() => console.log('Works!')}
              title="BK"
              source={{ uri: profilFotografiUrl }}
              containerStyle={{ width: 100, height: 100, borderRadius: 50 }}
              avatarStyle={{ width: 100, height: 100, borderRadius: 50 }}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              flex: 2,
              justifyContent: 'space-around'
            }}
          >
            <Text style={nameStyle}>
              {isim}
            </Text>
            <Text style={tagsStyle}>
              {this.renderTags(tags)}
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: 15, paddingLeft: 10, paddingRight: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1, fontSize: 20, color: '#000' }}>
              Ünvan
            </Text>
            <Text style={unvanStyle}>
              {unvan}
            </Text>
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <ListItem
            title="İletişim Bilgileriniz"
            titleStyle={{ fontSize: 20 }}
            rightIcon={{ name: 'mode-edit' }}
            onPressRightIcon={this.onEditContact}
          />
          <View style={{ padding: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={contactPropStyle}>Telefon</Text>
              <Text style={contactInfoStyle}>
                {telefon}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={contactPropStyle}>Email</Text>
              <Text style={contactInfoStyle}>
                {email}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={contactPropStyle}>Adres</Text>
              <Text style={contactInfoStyle}>
                {adres}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  nameStyle: {
    fontSize: 24
  },
  tagsStyle: {
    color: 'blue',
    fontSize: 18,
    paddingBottom: 20
  },
  contactPropStyle: {
    flex: 1,
    fontSize: 18,
    color: '#000'
  },
  unvanStyle: {
    fontSize: 20
  },
  contactInfoStyle: {
    flex: 3,
    fontSize: 18
  }
});

const mapStateToProps = state => {
  return state.user;
};

export default connect(mapStateToProps)(Profil);
