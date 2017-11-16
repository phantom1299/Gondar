import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import { TouchableOpacity, Dimensions } from 'react-native';
import moment from 'moment';
import trLocale from 'moment/locale/tr';

import { getUserById } from '../../../data';

const deviceWidth = Dimensions.get('window').width;
moment.updateLocale('tr', trLocale);

class OpportunityJobItem extends Component {
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
    this.state = {
      employer: {}
    };
  }

  componentWillMount() {
    getUserById(this.props.job.employer)
      .then(response => {
        response
          .json()
          .then(responseJson => this.setState({ employer: responseJson }))
          .catch(err => {
            this.setState({ employer: { name: err } });
          });
      })
      .catch(console.log);
  }

  onPress() {
    if (!this.pressed) {
      this.pressed = true;
      this.props.navigation.navigate('OppurtunityJob', {
        job: this.props.job,
        employer: this.state.employer,
        title: this.props.job.title,
        userId: this.props.userId
      });
    }
    setTimeout(() => {
      this.pressed = false;
    }, 2000);
  }

  render() {
    const { title, budget, description, tags, deadline, creationDate } = this.props.job;
    const { employer } = this.state;
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Card style={{ flex: 0, marginTop: 10, marginBottom: 10 }}>
          <CardItem header style={{ paddingBottom: 0 }}>
            <Left style={{ flex: 2 }}>
              <Thumbnail blurRadius={1} small source={{ uri: employer.avatarUrl }} />
              <Body>
                <Text style={{ fontSize: deviceWidth / 26, textAlign: 'center' }}>
                  {employer.name} {employer.surname}
                </Text>
              </Body>
            </Left>
            <Right>
              <Text style={{ color: 'grey', fontSize: deviceWidth / 26, textAlign: 'right' }}>
                {moment(creationDate || '2017-09-28T21:00:00.000Z').fromNow()}
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={{ fontSize: deviceWidth / 22, marginBottom: 10 }}>{title}</Text>
              <Text style={{ padding: 5, fontSize: deviceWidth / 28 }}>{description}</Text>
            </Body>
          </CardItem>
          <CardItem footer style={{ paddingTop: 0, flexWrap: 'wrap' }}>
            {tags.map((tag, i) => {
              return (
                <Text key={i} style={{ color: 'steelblue', fontSize: deviceWidth / 28 }}>
                  #{tag}{' '}
                </Text>
              );
            })}
            <Right>
              <Text style={{ fontSize: deviceWidth / 28 }}>Deadline:</Text>
              <Text style={{ color: 'grey', fontSize: deviceWidth / 28 }}>
                {moment(deadline).format('DD MMM YYYY')}
              </Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default OpportunityJobItem;
