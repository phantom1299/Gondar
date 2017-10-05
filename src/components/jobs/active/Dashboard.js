import React, { Component } from 'react';
import { Content, Card, CardItem, Text, Body } from 'native-base';

class ActiveJobDetail extends Component {
  renderNotes() {
    if (this.props.notes && this.props.notes.length > 0) {
      this.props.notes.map((note, i) => {
        return (
          <CardItem key={i}>
            <Body>
              <Text>{note.text}</Text>
            </Body>
          </CardItem>
        );
      });
    }
  }

  render() {
    return (
      <Content>
        <Card>{this.renderNotes()}</Card>
      </Content>
    );
  }
}

export default ActiveJobDetail;
