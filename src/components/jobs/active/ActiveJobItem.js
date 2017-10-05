import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardItem, Spinner, Text, ListItem } from 'native-base';
import { Slider } from 'react-native-elements';
import moment from 'moment';
import trLocale from 'moment/locale/tr';

import { data } from '../../../data';

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
    fetch(`${data.url}/jobs/${this.props.jobId}`)
      .then(response => {
        response.json().then(responseJson => this.setState({ job: responseJson, loading: false }));
      })
      .catch(console.log);
  }

  onPress() {
    if (!this.pressed) {
      this.pressed = true;
      Actions.activeJobTab({
        job: this.state.job,
        employer: this.state.employer,
        title: this.state.job.title
      });
    }
    setTimeout(() => {
      this.pressed = false;
    }, 2000);
  }

  renderLoading() {
    if (this.state.loading) {
      return <Spinner />;
    }
  }

  render() {
    const { title, description, deadline, progress } = this.state.job;
    if (this.state.loading) {
      return (
        <ListItem avatar button onPress={this.onPress}>
          <Card style={{ padding: 10, marginLeft: 10, marginRight: 10, marginTop: 10 }}>
            <Spinner />
          </Card>
        </ListItem>
      );
    }
    return (
      <ListItem avatar button onPress={this.onPress}>
        <Card style={{ padding: 10, marginLeft: 10, marginRight: 10, marginTop: 10 }}>
          <CardItem style={{ paddingLeft: 2, paddingRight: 2 }}>
            <Text style={{ flex: 1, justifyContent: 'flex-start', fontSize: 18 }}>{title}</Text>
            <Text style={{ alignSelf: 'flex-start' }}>{moment(deadline).fromNow()}</Text>
          </CardItem>
          <CardItem>
            <Text style={{ fontSize: 14 }}>{description}</Text>
          </CardItem>
          <Slider
            value={progress || 55}
            thumbStyle={{ marginBottom: 0, paddingBottom: 0, width: 0, height: 0 }}
            thumbTouchSize={{ width: 0, height: 0 }}
            minimumTrackTintColor="green"
            maximumValue={100}
            disabled
          />
          <Text style={{ alignSelf: 'center', paddingTop: 0 }}>%{progress || '55'}</Text>
        </Card>
      </ListItem>
    );
  }
}

export default ActiveJobItem;
