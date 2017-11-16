import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Tab, Tabs, TabHeading, Text, Icon, Button } from 'native-base';

import OpportunitiesList from './opportunity/OpportunityJobList';
import ActiveList from './active/ActiveJobList';

const deviceWidth = Dimensions.get('window').width;

class JobsList extends Component {
  static navigationOptions = ({ navigation }) => {
    const headerLeft = (
      <Icon
        ios="ios-menu"
        android="md-menu"
        style={{ fontSize: 28, color: 'white', marginLeft: 15 }}
        onPress={() => navigation.navigate('DrawerOpen')}
      />
    );
    const headerRight = (
      <Button transparent small onPress={() => navigation.navigate('NewJob')}>
        <Text style={{ fontSize: deviceWidth / 30, color: 'lightblue' }}>Yeni</Text>
      </Button>
    );
    return {
      headerStyle: { backgroundColor: '#4C3E54' },
      headerTintColor: 'white',
      headerTitle: 'İş Teklifleri',
      headerTitleStyle: { alignSelf: 'center', fontSize: deviceWidth / 26 },
      headerLeft,
      headerRight
    };
  };
  render() {
    return (
      <Container>
        <Tabs initialPage={0}>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: '#78909C' }}>
                <Text style={{ fontSize: deviceWidth / 26 }}>Aktif</Text>
              </TabHeading>
            }
          >
            <ActiveList
              navigation={this.props.navigation}
              jobsId={this.props.user.activeJobs}
              userId={this.props.user._id}
            />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: '#78909C' }}>
                <Text style={{ fontSize: deviceWidth / 26 }}>Fırsatlar</Text>
              </TabHeading>
            }
          >
            <OpportunitiesList
              navigation={this.props.navigation}
              user={{ _id: this.props.user._id, tags: this.props.user.tags }}
            />
          </Tab>
          <Tab
            jobsId={this.props.user.finishedJobs}
            heading={
              <TabHeading style={{ backgroundColor: '#78909C' }}>
                <Text style={{ fontSize: deviceWidth / 26 }}>Tamamlanmış</Text>
              </TabHeading>
            }
          >
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
