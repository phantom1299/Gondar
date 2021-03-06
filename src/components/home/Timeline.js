import React, { Component } from 'react';
import { Icon } from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import Timeline from 'react-native-timeline-listview';

const deviceWidth = Dimensions.get('window').width;

export default class Example extends Component {
  static navigationOptions = ({ navigation }) => {
    const headerLeft = (
      <Icon
        ios="ios-menu"
        android="md-menu"
        style={{ fontSize: 28, color: 'white', marginLeft: 15 }}
        onPress={() => navigation.navigate('DrawerOpen')}
      />
    );
    const headerRight = <View />;
    return {
      headerStyle: { backgroundColor: '#4C3E54' },
      headerTintColor: 'white',
      headerTitle: 'Ana Sayfa',
      headerTitleStyle: { alignSelf: 'center', fontSize: deviceWidth / 26 },
      headerLeft,
      headerRight
    };
  };
  
  constructor() {
    super();
    this.onEndReached = this.onEndReached.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onRefresh = this.onRefresh.bind(this);

    this.data = [
      {
        time: '09:00',
        title: 'Archery Training',
        description:
          'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. '
      },
      {
        time: '10:45',
        title: 'Play Badminton',
        description:
          'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'
      },
      { time: '12:00', title: 'Lunch' },
      {
        time: '14:00',
        title: 'Watch Soccer',
        description: 'Team sport played between two teams of eleven players with a spherical ball. '
      },
      {
        time: '16:30',
        title: 'Go to Fitness center',
        description: 'Look out for the Best Gym & Fitness Centers around me :)'
      }
    ];

    this.state = {
      isRefreshing: false,
      waiting: false,
      data: this.data
    };
  }

  onRefresh() {
    this.setState({ isRefreshing: true });
    //refresh to initial data
    setTimeout(() => {
      //refresh to initial data
      this.setState({
        data: this.data,
        isRefreshing: false
      });
    }, 2000);
  }

  onEndReached() {
    if (!this.state.waiting) {
      this.setState({ waiting: true });

      //fetch and concat data
      setTimeout(() => {
        //refresh to initial data
        const data = this.state.data.concat([
          {
            time: '18:00',
            title: 'Load more data',
            description: 'append event at bottom of timeline'
          },
          {
            time: '18:00',
            title: 'Load more data',
            description: 'append event at bottom of timeline'
          },
          {
            time: '18:00',
            title: 'Load more data',
            description: 'append event at bottom of timeline'
          },
          {
            time: '18:00',
            title: 'Load more data',
            description: 'append event at bottom of timeline'
          },
          {
            time: '18:00',
            title: 'Load more data',
            description: 'append event at bottom of timeline'
          }
        ]);

        this.setState({
          waiting: false,
          data
        });
      }, 2000);
    }
  }

  renderFooter() {
    if (this.state.waiting) {
      return <ActivityIndicator />;
    }
    return <Text>~</Text>;
  }

  render() {
    //'rgb(45,156,219)'
    return (
      <Timeline
        style={styles.list}
        data={this.state.data}
        timeContainerStyle={{ minWidth: 52 }}
        timeStyle={{
          textAlign: 'center',
          backgroundColor: '#ff9797',
          color: 'white',
          padding: 5,
          borderRadius: 13
        }}
        descriptionStyle={{ color: 'gray' }}
        options={{
          refreshControl: (
            <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />
          ),
          renderFooter: this.renderFooter,
          onEndReached: this.onEndReached
        }}
        innerCircle={'dot'}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {}
});
