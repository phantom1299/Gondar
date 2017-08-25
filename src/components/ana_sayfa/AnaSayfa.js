import React, { Component } from 'react';
import { Container, Tab, Tabs, TabHeading, Icon, Text, Badge, Button } from 'native-base';
import AktifIslerim from './AktifIslerim';
import Sohbetler from './chat/Sohbetler';

class AnaSayfa extends Component {
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
          <AktifIslerim />
        </Tab>
        <Tab
          heading={
            <TabHeading>
              <Icon name="ios-chatboxes" />
              <Badge>
                <Text>2</Text>
              </Badge>
              <Text>Mesajlar</Text>
            </TabHeading>
          }
        >
          <Sohbetler />
        </Tab>
      </Tabs>
    );
  }
}

export default AnaSayfa;
