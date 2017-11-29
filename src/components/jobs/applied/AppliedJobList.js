import React, { Component } from 'react';
import { Container, Content, Spinner, List, Text } from 'native-base';

import AppliedJobItem from './AppliedJobItem';

class AppliedJobList extends Component {
  render() {
    if (this.props.jobsId !== null && this.props.jobsId.length > 0) {
      const unique = this.props.jobsId.filter((v, i, a) => a.indexOf(v) === i);
      return (
        <Container>
          <Content>
            <List
              dataArray={unique}
              renderRow={jobId => (
                <AppliedJobItem
                  navigation={this.props.navigation}
                  jobId={jobId}
                  userId={this.props.userId}
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
            Şuanda bekleyen bir başvurunuz yok.
          </Text>
        </Content>
      </Container>
    );
  }
}

export default AppliedJobList;
