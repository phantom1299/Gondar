import React, { Component } from 'react';
import { Container, Tab, Tabs, TabHeading, Icon, Text, Badge, Button } from 'native-base';
import ActiveJobs from './ActiveJobs';
import Chats from './chat/Chats';

class Dashboard extends Component {
  render() {
    return (
      <Tabs initialPage={0} tabBarPosition="bottom">
        <Tab
          heading={
            <TabHeading>
              <Icon name="home" />
              <Text>Aktif İşler</Text>
            </TabHeading>
          }
        >
          <ActiveJobs />
        </Tab>
        <Tab
          heading={
            <TabHeading>
              <Icon name="ios-chatboxes" style={{ fontSize: 28 }} />
              <Badge>
                <Text>2</Text>
              </Badge>
              <Text>Mesajlar</Text>
            </TabHeading>
          }
        >
          <Chats />
        </Tab>
      </Tabs>
    );
  }
}

export default Dashboard;
