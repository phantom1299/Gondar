import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, ViewPropTypes, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import Icon1 from 'react-native-vector-icons/FontAwesome';

import { CardSection } from './common';

const deviceWidth = Dimensions.get('window').width;

class SideMenu extends Component {
  constructor() {
    super();
    this.onProfile = this.onProfile.bind(this);
    this.onDashboard = this.onDashboard.bind(this);
    this.onJobs = this.onJobs.bind(this);
    this.onUsers = this.onUsers.bind(this);
    this.onSettings = this.onSettings.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.pressed = false;
  }

  onProfile() {
    if (!this.pressed) {
      this.pressed = true;
      
      this.props.navigation.navigate('Profile');
      setTimeout(() => {
        this.pressed = false;
      }, 500);
    }
  }

  onDashboard() {
    if (!this.pressed) {
      this.pressed = true;

      this.props.navigation.navigate('Home');
      setTimeout(() => {
        this.pressed = false;
      }, 500);
    }
  }

  onJobs() {
    if (!this.pressed) {
      this.pressed = true;

      this.props.navigation.navigate('Jobs');
      setTimeout(() => {
        this.pressed = false;
      }, 500);
    }
  }

  onUsers() {
    if (!this.pressed) {
      this.pressed = true;

      this.props.navigation.navigate('Users');
      setTimeout(() => {
        this.pressed = false;
      }, 500);
    }
  }

  onSettings() {
    if (!this.pressed) {
      this.pressed = true;

      this.props.navigation.navigate('Settings');
      setTimeout(() => {
        this.pressed = false;
      }, 500);
    }
  }

  onLogout() {
    if (!this.pressed) {
      this.pressed = true;

      const actionToDispatch = NavigationActions.reset({
        index: 0,
        key: null, // black magic
        actions: [NavigationActions.navigate({ routeName: 'Auth' })]
      });
      this.props.navigation.dispatch(actionToDispatch);
    }
  }

  render() {
    const user = this.props.user;
    return (
      <View style={[styles.viewContainer, this.props.sceneStyle]}>
        <ListItem iconRight avatar style={{ padding: '3%', paddingRight: 0 }}>
          <TouchableOpacity onPress={this.onProfile} style={{ flexDirection: 'row', flex: 5 }}>
            <Left>
              <Thumbnail
                size={deviceWidth / 20}
                blurRadius={1}
                source={{
                  uri:
                    user.avatarUrl ||
                    'http://www.oldpotterybarn.co.uk/wp-content/uploads/2015/06/default-medium.png'
                }}
              />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={{ fontSize: deviceWidth / 24, textAlign: 'center' }}>{user.name}</Text>
              <Text style={{ fontSize: deviceWidth / 24, textAlign: 'center' }}>
                {user.surname}
              </Text>
            </Body>
          </TouchableOpacity>
          <TouchableOpacity transparent onPress={this.onLogout}>
            <Icon1
              name={'sign-out'}
              style={{ padding: '3%' }}
              size={deviceWidth / 18}
              color={'#f50'}
            />
          </TouchableOpacity>
        </ListItem>

        <CardSection
          style={{
            flexDirection: 'column',
            margin: '3%',
            marginTop: 0,
            marginBottom: 0,
            padding: '5%',
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
              size: deviceWidth / 16
            }}
            title="Pano"
            textStyle={styles.textStyle}
            backgroundColor="transparent"
            color="#555"
            buttonStyle={styles.buttonStyle}
            containerViewStyle={{ marginLeft: 0 }}
            onPress={this.onDashboard}
          />
          <Button
            Component={TouchableOpacity}
            icon={{
              name: 'tasks',
              type: 'font-awesome',
              color: iconColor,
              size: deviceWidth / 16
            }}
            title="İş Teklifleri"
            textStyle={styles.textStyle}
            backgroundColor="transparent"
            color="#555"
            buttonStyle={styles.buttonStyle}
            containerViewStyle={{ marginLeft: 0 }}
            onPress={this.onJobs}
          />
          <Button
            Component={TouchableOpacity}
            icon={{
              name: 'users',
              type: 'font-awesome',
              color: iconColor,
              size: deviceWidth / 16
            }}
            title="Kişiler"
            textStyle={styles.textStyle}
            backgroundColor="transparent"
            color="#555"
            buttonStyle={styles.buttonStyle}
            containerViewStyle={{ marginLeft: 0 }}
            onPress={this.onUsers}
          />
        </CardSection>

        <CardSection
          style={{
            flexDirection: 'column',
            margin: '3%',
            marginTop: 0,
            padding: '5%'
          }}
        >
          <Button
            Component={TouchableOpacity}
            icon={{
              name: 'gear',
              type: 'font-awesome',
              color: iconColor,
              size: deviceWidth / 16
            }}
            title="Ayarlar"
            textStyle={styles.textStyle}
            backgroundColor="transparent"
            color="#555"
            buttonStyle={styles.buttonStyle}
            containerViewStyle={{ marginLeft: 0 }}
            onPress={this.onSettings}
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
    backgroundColor: 'white'
  },
  textStyle: {
    fontSize: deviceWidth / 24,
    color: '#888'
  },
  buttonStyle: {
    alignSelf: 'flex-start'
  }
});

SideMenu.contextTypes = contextTypes;
SideMenu.propTypes = propTypes;

const mapStateToProps = state => {
  const user = state.user.user;
  return { user };
};

export default connect(mapStateToProps)(SideMenu);
