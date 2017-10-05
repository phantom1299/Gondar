import React, { Component } from 'react';
import { Container, Tab, Tabs } from 'native-base';

import ActiveJobDetails from './ActiveJobDetails';
import Dashboard from './Dashboard';

class ActiveJobTab extends Component {
  render() {
    return (
      <Container>
        <Tabs initialPage={0}>
          <Tab heading="Pano">
            <Dashboard notes={this.props.job.notes}/>
          </Tab>
          <Tab heading="Detaylar">
            <ActiveJobDetails job={this.props.job}/>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default ActiveJobTab;
