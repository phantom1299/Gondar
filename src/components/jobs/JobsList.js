import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Container, Content, Tab, Tabs, TabHeading, Text, Icon, Button, Toast } from 'native-base';

import OpportunitiesList from './opportunity/OpportunityJobList';
import ActiveList from './active/ActiveJobList';
import AppliedJobList from './applied/AppliedJobList';

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
      <Button
        transparent
        small
        onPress={() => navigation.navigate('NewJob', { refresh: this.forceUpdate })}
      >
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

  componentWillMount() {
    if (this.props.navigation.state.params) this.showToast();
  }

  showToast() {
    if (this.props.navigation.state.params.jobAdded) {
      Toast.show({
        text: 'İş Teklifi eklendi!',
        position: 'bottom',
        buttonText: 'Tamam',
        type: 'success',
        duration: 2000
      });
      this.props.navigation.state.params.jobAdded = false;
    } else if (this.props.navigation.state.params.jobDeleted) {
      Toast.show({
        text: 'İş Teklifi başarıyla silindi!',
        position: 'bottom',
        buttonText: 'Tamam',
        type: 'success',
        duration: 2000
      });
      this.props.navigation.state.params.jobDeleted = false;
    } else if (this.props.navigation.state.params.jobStatusChanged) {
      Toast.show({
        text: 'İş Teklifinin durumu başarıyla değiştirildi!',
        position: 'bottom',
        buttonText: 'Tamam',
        type: 'success',
        duration: 2000
      });
      this.props.navigation.state.params.jobStatusChanged = false;
    }
  }

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
              user={this.props.user}
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
                <Text style={{ fontSize: deviceWidth / 26 }}>Başvurular</Text>
              </TabHeading>
            }
          >
            <AppliedJobList
              navigation={this.props.navigation}
              jobsId={this.props.user.appliedJobs}
              userId={this.props.user._id}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const user = state.user.user;
  return { user };
};

export default connect(mapStateToProps)(JobsList);
