import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Card, CardItem, Spinner, ListItem, View } from 'native-base';
import moment from 'moment';
import trLocale from 'moment/locale/tr';
import * as Progress from 'react-native-progress';

import { getJobById } from '../../../data';
import { AutoText as Text } from '../../common';

const deviceWidth = Dimensions.get('window').width;
moment.updateLocale('tr', trLocale);

class ActiveJobItem extends Component {
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
    this.pressed = false;
    this.state = {
      loading: true,
      job: []
    };
  }

  componentWillMount() {
    getJobById(this.props.jobId)
      .then(response => {
        if (response.status === 200) {
          response
            .json()
            .then(responseJson => this.setState({ job: responseJson, loading: false }));
        }
      })
      .catch(console.log);
  }

  onPress() {
    if (!this.pressed && !this.state.loading) {
      this.pressed = true;
      this.props.navigation.navigate('ActiveJob', {
        job: this.state.job,
        employer: this.state.employer,
        title: this.state.job.title,
        userId: this.props.userId
      });
    }
    setTimeout(() => {
      this.pressed = false;
    }, 2000);
  }
  
  render() {
    const { title, description, deadline, progress } = this.state.job;
    return (
      <ListItem
        button
        disabled={this.state.loading}
        onPress={this.onPress}
        style={{ borderBottomWidth: 0, alignSelf: 'center', padding: '2%' }}
      >
        <Progress.Circle
          size={deviceWidth / 2}
          indeterminate={this.state.loading}
          thickness={10}
          color={'#332324'}
          progress={0.5}
          borderWidth={progress === 0 ? 1 : 0}
          showsText
        >
          <View style={{ flex: 1, justifyContent: 'space-around', margin: '8%' }}>
            <Text
              style={{
                alignSelf: 'center',
                textAlign: 'center',
                fontSize: deviceWidth / 15
              }}
            >
              {title}
            </Text>
            <Text style={{ textAlign: 'center', fontSize: deviceWidth / 30 }}>
              {moment(deadline).fromNow()}
            </Text>
          </View>
        </Progress.Circle>
      </ListItem>
    );
  }
}

export default ActiveJobItem;
