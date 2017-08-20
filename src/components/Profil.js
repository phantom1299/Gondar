import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Card, ListItem, FormLabel, FormInput, Avatar } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Profil extends Component {
  constructor() {
    super();
    this.onEditContact = this.onEditContact.bind(this);
    this.state = {
      height: 0,
      editable: false
    };
  }

  onEditContact() {
    this.setState({ editable: !this.state.editable });
  }

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
      unvanStyle,
      contactInfoContainerStyle,
      contactPropStyle,
      contactPropContainerStyle,
      contactInfoStyle
    } = styles;
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#fff' }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
        extraScrollHeight={100}
        enableOnAndroid
      >
        <Card
          style={{
            padding: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.5,
            elevation: 1
          }}
        >
          <View
            style={{ 
              flexDirection: 'row',
              padding: 20,
              paddingBottom: 40,
              paddingTop: 40,
              backgroundColor: '#5a5a'
            }}
          >
            <View style={{ marginRight: 20, flex: 1, alignSelf: 'center' }}>
              <Avatar
                rounded
                large
                showEditButton
                onEditPress={() => console.log('Works!')}
                title="BK"
                source={{ uri: profilFotografiUrl }}
                overlayContainerStyle={{ width: 100, height: 100, borderRadius: 50 }}
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
        </Card>
        <Card
          style={{
            marginTop: 0,
            padding: 20,
            backgroundColor: '#00a5b533',
            borderTopWidth: 0,
            flex: 1
          }}
        >
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 1, fontSize: 20, color: '#000' }}>Ünvan</Text>
              <Text style={unvanStyle}>
                {unvan}
              </Text>
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <ListItem
              title="İletişim Bilgileriniz"
              titleStyle={{ fontSize: 20 }}
              rightIcon={
                this.state.editable
                  ? { name: 'check-circle', color: '#0a0' }
                  : { name: 'mode-edit', color: '#000' }
              }
              onPressRightIcon={this.onEditContact}
            />
            <View>
              <View style={{ flexDirection: 'row' }}>
                <FormLabel
                  style={({ marginRight: 0 }, contactPropContainerStyle)}
                  labelStyle={contactPropStyle}
                  containerStyle={contactPropContainerStyle}
                >
                  Telefon
                </FormLabel>
                <FormInput
                  inputStyle={contactInfoStyle}
                  containerStyle={contactInfoContainerStyle}
                  ref="form1"
                  containerRef="telInputContainer"
                  textInputRef="telInput"
                  placeholder="555 545 5454"
                  value={telefon}
                  editable={this.state.editable}
                  keyboardType="phone-pad"
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <FormLabel
                  style={({ marginRight: 0 }, contactPropContainerStyle)}
                  labelStyle={contactPropStyle}
                  containerStyle={contactPropContainerStyle}
                >
                  Email
                </FormLabel>
                <FormInput
                  inputStyle={contactInfoStyle}
                  containerStyle={contactInfoContainerStyle}
                  ref="form2"
                  containerRef="emailInputContainer"
                  textInputRef="emailInput"
                  placeholder="birisi@example.com"
                  value={email}
                  editable={this.state.editable}
                  keyboardType="email-address"
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <FormLabel
                  style={({ marginRight: 0 }, contactPropContainerStyle)}
                  labelStyle={contactPropStyle}
                  containerStyle={contactPropContainerStyle}
                >
                  Adres
                </FormLabel>
                <FormInput
                  inputStyle={contactInfoStyle}
                  containerStyle={contactInfoContainerStyle}
                  ref="form3"
                  containerRef="adresInputContainer"
                  textInputRef="adresInput"
                  placeholder="Adres"
                  editable={this.state.editable}
                  multiline
                  value={adres}
                  onChangeText={text2 => {
                    this.setState({ text2 });
                  }}
                  onContentSizeChange={event => {
                    this.setState({ height: event.nativeEvent.contentSize.height });
                  }}
                  style={[{ marginTop: 4 }, { height: Math.max(10, this.state.height) }]}
                />
              </View>
            </View>
          </View>
        </Card>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  nameStyle: {
    fontSize: 24,
    marginTop: 10
  },
  tagsStyle: {
    color: '#44fa',
    fontSize: 16,
    marginBottom: 10
  },
  unvanStyle: {
    fontSize: 20
  },
  contactPropContainerStyle: {
    flex: 1,
    marginRight: 0,
    paddingRight: 0
  },
  contactPropStyle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    marginLeft: 0,
    marginRight: 0
  },
  contactInfoContainerStyle: {
    flex: 3,
    marginLeft: 0
  },
  contactInfoStyle: {
    fontSize: 16,
    height: 20,
    width: 198,
    color: '#888',
    marginTop: 2
  }
});

const mapStateToProps = state => {
  return state.user;
};

export default connect(mapStateToProps)(Profil);
