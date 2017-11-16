import React, { Component } from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';

import LoginForm from './components/LoginForm';
import Timeline from './components/home/Timeline';
import SideMenu from './components/SideMenu';
import UserList from './components/users/UserList';
import UserProfile from './components/users/UserProfile';
import NewUser from './components/users/NewUser';
import NewJob from './components/jobs/NewJob';
import Settings from './components/Settings';
import Profile from './components/Profile';
import JobsList from './components/jobs/JobsList';
import OppurtunityJobDetails from './components//jobs/opportunity/OppurtunityJobDetails';
import ActiveJobTab from './components/jobs/active/ActiveJobTab';
import Messages from './components/home/chat/Messages';

const navOptions = {
  headerStyle: { backgroundColor: '#ffab00' },
  headerTintColor: 'white'
};

const HomeStack = StackNavigator({
  Timeline: {
    screen: Timeline
  }
});

const JobStack = StackNavigator({
  JobsList: {
    screen: JobsList
  },
  NewJob: {
    screen: NewJob
  },
  ActiveJob: {
    screen: ActiveJobTab
  },
  OppurtunityJob: {
    screen: OppurtunityJobDetails
  }
});

const UserStack = StackNavigator({
  UserList: {
    screen: UserList
  },
  UserProfile: { screen: UserProfile },
  NewUser: { screen: NewUser }
});

const ProfileStack = new StackNavigator({
  Profile: {
    screen: Profile
  }
});

const Drawer = DrawerNavigator(
  {
    Profile: {
      screen: ProfileStack
    },
    Home: {
      screen: HomeStack,
      navigationOptions: {
        headerTitle: 'Home',
        ...navOptions
      }
    },
    Jobs: { screen: JobStack },
    Users: { screen: UserStack },
    Settings: { screen: Settings }
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: '#e91e63'
    },
    contentComponent: props => <SideMenu {...props} />
  }
);

// const DrawerNavigation = StackNavigator(
//   {
//     DrawerStack: { screen: Drawer }
//   },
//   {
//     headerMode: 'float',
//     navigationOptions: ({ navigation }) => ({
//       headerStyle: { backgroundColor: '#4C3E54' },
//       headerTintColor: 'white',
//       headerTitle: 'Hoşgeldin',
//       headerLeft: (
//         <Icon
//           ios="ios-menu"
//           android="md-menu"
//           style={{ fontSize: 28, color: 'red', marginLeft: 15 }}
//           onPress={() => {
//             if (navigation.state.index === 0) {
//               // check if drawer is not open, then only open it
//               navigation.navigate('DrawerOpen');
//             } else {
//               // else close the drawer
//               navigation.navigate('DrawerClose');
//             }
//           }}
//         />
//       )
//     })
//   }
// );

const AuthStack = StackNavigator(
  {
    Login: { screen: LoginForm }
  },
  {
    headerMode: 'none'
  }
);

export const Router = StackNavigator(
  {
    Auth: { screen: AuthStack },
    Drawer: { screen: Drawer }
  },
  {
    // Default config for all screens
    headerMode: 'none',
    title: 'Main',
    initialRouteName: 'Auth'
  }
);
