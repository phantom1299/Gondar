import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, ViewPropTypes, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Button } from 'react-native-elements';
import { ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import Icon1 from 'react-native-vector-icons/FontAwesome';

import { CardSection } from './common';

let pressed = false;

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

class SideMenu extends Component {
  constructor() {
    super();
    this.onProfile = this.onProfile.bind(this);
    this.onDashboard = this.onDashboard.bind(this);
    this.onJobs = this.onJobs.bind(this);
    this.onUsers = this.onUsers.bind(this);
    this.onNewJob = this.onNewJob.bind(this);
    this.onSettings = this.onSettings.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  //TODO
  componentDidUpdate() {
    setTimeout(() => {
      pressed = false;
    }, 500);
  }

  onProfile() {
    if (!pressed) {
      pressed = true;
      Actions.profile({ type: 'replace', kullanici: this.props.user });
    }
  }

  onDashboard() {
    if (!pressed) {
      pressed = true;
      Actions.dashboard({ type: 'replace' });
    }
  }

  onJobs() {
    if (!pressed) {
      pressed = true;
      Actions.jobsList({ type: 'replace' });
    }
  }

  onUsers() {
    if (!pressed) {
      pressed = true;
      Actions.userList({ type: 'replace' });
    }
  }

  onNewJob() {
    if (!pressed) {
      pressed = true;
      Actions.newJob({ type: 'replace' });
    }
  }

  onSettings() {
    if (!pressed) {
      pressed = true;
      Actions.settings({ type: 'replace' });
    }
  }

  onLogout() {
    if (!pressed) {
      pressed = true;
      Actions.auth({ type: 'reset' });
    }
  }

  render() {
    const user = this.props.user;
    return (
      <View style={[styles.viewContainer, this.props.sceneStyle]}>
        <ListItem iconRight avatar>
          <TouchableOpacity onPress={this.onProfile} style={{ flexDirection: 'row', flex: 5 }}>
            <Left>
              <Thumbnail
                large
                source={{
                  uri:
                    user.avatarU ||
                    'http://www.oldpotterybarn.co.uk/wp-content/uploads/2015/06/default-medium.png'
                }}
              />
            </Left>
            <Body>
              <Text style={{ fontSize: 20 }}>{user.name}</Text>
              <Text style={{ fontSize: 20 }}>{user.surname}</Text>
            </Body>
          </TouchableOpacity>
          <TouchableOpacity
            transparent
            onPress={this.onLogout}
            style={{ flexDirection: 'row', flex: 1 }}
          >
            <Right style={{ borderBottomWidth: 0 }}>
              <Icon1 name={'sign-out'} size={28} color={'#f50'} />
            </Right>
          </TouchableOpacity>
        </ListItem>

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
            onPress={this.onDashboard}
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
            onPress={this.onJobs}
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
            onPress={this.onUsers}
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
    flex: 1
  },
  profileButtonContainer: {
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
  const user = state.auth.user;
  return { user };
};

export default connect(mapStateToProps)(SideMenu);
