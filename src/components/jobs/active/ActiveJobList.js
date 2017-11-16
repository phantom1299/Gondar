import React, { Component } from 'react';
import { Container, Content, Spinner, List, Text } from 'native-base';

import ActiveJobItem from './ActiveJobItem';

const data = ['59cdf5914c739200048e4876'];

class ActiveList extends Component {
  renderLoading() {
    if (this.state.loading) {
      return <Spinner />;
    }
  }

  render() {
    if (this.props.jobsId !== null) {
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
          <Text style={{ marginTop: '50%', fontSize: 16, color: 'grey' }}>
            Şuan aktif bir iş teklifiniz
          </Text>
          <Text style={{ fontSize: 16, alignSelf: 'center', color: 'grey' }}>bulunmamaktadır.</Text>
        </Content>
      </Container>
    );
  }
}

export default ActiveList;
