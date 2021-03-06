import React, { Component } from 'react';
import { Container, Content, Spinner, List, Text } from 'native-base';

import ActiveJobItem from './ActiveJobItem';

class ActiveList extends Component {
  render() {
    if (this.props.jobsId !== null && this.props.jobsId.length > 0) {
      const unique = this.props.jobsId.filter((v, i, a) => a.indexOf(v) === i);
      return (
        <Container>
          <Content>
            <List
              dataArray={unique}
              renderRow={jobId => (
                <ActiveJobItem
                  navigation={this.props.navigation}
                  jobId={jobId}
                  user={this.props.user}
                />
              )}
            />
          </Content>
        </Container>
      );
    }
    return (
      <Container style={{ alignItems: 'center' }}>
        <Content>
          <Text style={{ marginTop: '10%', fontSize: 16, color: 'grey', textAlign: 'center' }}>
            Şuan aktif bir iş teklifiniz bulunmamaktadır.
          </Text>
        </Content>
      </Container>
    );
  }
}

export default ActiveList;
