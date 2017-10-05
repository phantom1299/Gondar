import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Tab, Tabs, Text } from 'native-base';

import OpportunitiesList from './opportunity/OpportunityJobList';
import ActiveList from './active/ActiveJobList';

class JobsList extends Component {
  render() {
    return (
      <Container>
        <Tabs initialPage={0}>
          <Tab heading="Aktif">
            <ActiveList jobsId={this.props.user.activeJobs} />
          </Tab>
          <Tab heading="Fırsatlar">
            <OpportunitiesList tags={this.props.user.tags} />
          </Tab>
          <Tab jobsId={this.props.user.finishedJobs} heading="Tamamlanmış">
            <Container style={{ alignItems: 'center' }}>
              <Content>
                <Text style={{ marginTop: '50%', fontSize: 16, color: 'grey' }}>
                  Şuan tamamlanmış bir iş teklifiniz
                </Text>
                <Text style={{ fontSize: 16, alignSelf: 'center', color: 'grey' }}>
                  bulunmamaktadır.
                </Text>
              </Content>
            </Container>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const user = state.auth.user;
  return { user };
};

export default connect(mapStateToProps)(JobsList);
