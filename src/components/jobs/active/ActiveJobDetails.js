import React, { Component } from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Right,
  Thumbnail,
  Icon,
  Left,
  ListItem
} from 'native-base';

class ActiveJobDetail extends Component {
  render() {
    const { description, deadline, employer, budget, tags } = this.props.job;
    return (
      <Container>
        <Content>
          <Card>
            <ListItem style={{ margin: 10 }} avatar>
              <Left>
                <Thumbnail blurRadius={1} source={{ uri: employer.avatarUrl }} />
              </Left>
              <Body style={{ borderBottomWidth: 0 }}>
                <Text>
                  {employer.name} {employer.surname}
                </Text>
              </Body>
              <Right style={{ borderBottomWidth: 0 }}>
                <Icon name="ios-call" style={{ fontSize: 28, color: 'forestgreen' }} />
              </Right>
            </ListItem>
            <CardItem footer>
              <Text>GeekyAnts</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default ActiveJobDetail;
