import React, { Component } from 'react';
import { Container, Content, Spinner, List, Text } from 'native-base';

import ActiveJobItem from './ActiveJobItem';

const data = ['59c6d2695907990004e5828a', '59cdf5914c739200048e4876'];

class ActiveList extends Component {
  renderLoading() {
    if (this.state.loading) {
      return <Spinner />;
    }
  }

  render() {
    if (this.props.jobsId === null || data) {
      return (
        <Container>
          <Content>
            <List dataArray={data} renderRow={jobId => <ActiveJobItem jobId={jobId} />} />
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
