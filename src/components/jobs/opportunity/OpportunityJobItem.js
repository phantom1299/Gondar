import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Card, CardItem, Thumbnail, Text, Left, Body, Right } from 'native-base';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import trLocale from 'moment/locale/tr';

import { data } from '../../../data';

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
    fetch(`${data.url}/users/${this.props.job.employer}`)
      .then(response => {
        response.json().then(responseJson => this.setState({ employer: responseJson }));
      })
      .catch(console.log);
  }

  onPress() {
    if (!this.pressed) {
      this.pressed = true;
      Actions.opportunityJobDetails({
        job: this.props.job,
        employer: this.state.employer,
        title: this.props.job.title
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
          <CardItem style={{ paddingBottom: 0 }}>
            <Left style={{ flex: 2 }}>
              <Thumbnail blurRadius={1} small source={{ uri: employer.avatarUrl }} />
              <Body>
                <Text>
                  {employer.name} {employer.surname}
                </Text>
              </Body>
            </Left>
            <Right>
              <Text style={{ color: 'grey' }}>
                {moment(creationDate || '2017-09-28T21:00:00.000Z').fromNow()}
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>{title}</Text>
              <Text style={{ padding: 10 }}>{description}</Text>
            </Body>
          </CardItem>
          <CardItem style={{ paddingTop: 0, flexWrap: 'wrap' }}>
            {tags.map((tag, i) => {
              return (
                <Text key={i} style={{ color: 'steelblue' }}>
                  #{tag}{' '}
                </Text>
              );
            })}
            <Right>
              <Text>Deadline:</Text>
              <Text style={{ color: 'grey' }}>{moment(deadline).format('DD MMM YYYY')}</Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default OpportunityJobItem;
