import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Card, CardItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';

class JobsItem extends Component {
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    if (!this.pressed) {
      this.pressed = true;
      Actions.jobDetails({ job: this.props.job, title: this.props.job.title });
    }
    setTimeout(() => { this.pressed = false; }, 2000);
  }

  render() {
    const { title, budget, detail, tags, deadline, employer } = this.props.job;
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Card style={{ flex: 0, marginLeft: 5, marginRight: 5 }}>
          <CardItem>
            <Left style={{ flex: 2 }}>
              <Thumbnail source={{ uri: employer.avatarU }} />
              <Body>
                <Text>
                  {employer.name} {employer.surname}
                </Text>
              </Body>
            </Left>
            <Right>
              <Text>Deadline:</Text>
              <Text note>
                {deadline}
              </Text>
            </Right>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                {title}
              </Text>
              <Text style={{ padding: 10 }}>
                {detail}
              </Text>
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
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default JobsItem;
