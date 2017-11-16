import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  Alert,
  Dimensions
} from 'react-native';
import {
  Card,
  CardItem,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Button,
  ActionSheet
} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Icon, Button as Button1 } from 'react-native-elements';
import moment from 'moment';
import trLocale from 'moment/locale/tr';

// import { AutoText as Text } from '../../common';
import { applyToJob } from '../../../data';

moment.updateLocale('tr', trLocale);

const deviceWidth = Dimensions.get('window').width;

class JobDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerTitle = params.job ? `${params.job.title}` : '';
    return {
      headerStyle: { backgroundColor: '#4C3E54' },
      headerTintColor: 'white',
      headerTitle,
      headerRight: <View />,
      headerTitleStyle: { alignSelf: 'center', fontSize: deviceWidth / 26 }
    };
  };
  constructor() {
    super();
    this.onApply = this.onApply.bind(this);
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentWillUpdate() {
    // LayoutAnimation.configureNext({
    //   duration: 250,
    //   create: {
    //     type: LayoutAnimation.Types.linear,
    //     property: LayoutAnimation.Properties.opacity
    //   },
    //   update: { type: LayoutAnimation.Types.linear }
    // });
  }

  onApply = (jobId, userId) => {
    applyToJob(jobId, userId);
  };

  renderOptions() {
    const { job, userId } = this.props.navigation.state.params;
    return (
      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
        <Button
          style={{ flex: 1, justifyContent: 'center', borderRadius: 0 }}
          textStyle={{ textAlign: 'center' }}
          success
        >
          <Text>İletİşİme Geç</Text>
        </Button>
        <Button
          onPress={() => this.onApply(job._id, userId)}
          style={{ flex: 1, justifyContent: 'center', borderRadius: 0 }}
          primary
        >
          <Text>Başvur</Text>
        </Button>
      </View>
    );
  }

  render() {
    const { _id, budget, description, tags, deadline } = this.props.navigation.state.params.job;
    const { employer } = this.props.navigation.state.params;
    const { propDefStyle, descriptionStyle, deadlineStyle, budgetStyle, tagStyle } = styles;
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Card style={{ padding: 15 }}>
          <ListItem iconRight avatar style={{ marginLeft: 0, paddingLeft: 0 }}>
            <Text style={[propDefStyle, { flex: 1 }]}>İş Veren: </Text>
            <Left>
              <Text style={{ fontSize: deviceWidth / 25 }}>
                {employer.name} {employer.surname}
              </Text>
            </Left>
            <Thumbnail small blurRadius={1} source={{ uri: employer.avatarUrl }} />
          </ListItem>
          <View style={{ flexDirection: 'row', marginVertical: '2%' }}>
            <Text style={[propDefStyle, { flex: 1 }]}>Bütçe:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Icon
                size={deviceWidth / 28}
                type="font-awesome"
                name="try"
                containerStyle={{ paddingRight: 2, paddingTop: 2 }}
                color="#444"
              />
              <Text style={budgetStyle}>{budget} </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: '2%' }}>
            <Text style={[propDefStyle, { flex: 1 }]}>Son Teslim Tarihi: </Text>
            <Text style={deadlineStyle}>{moment(deadline).format('DD MMM YYYY')}</Text>
          </View>
          <View style={{ marginVertical: '2%' }}>
            <Text style={[propDefStyle, {}]}>Açıklama:</Text>
            <Text style={descriptionStyle}>{description}</Text>
          </View>
          <View style={{ marginVertical: '2%' }}>
            <Text style={propDefStyle}>Etiketler: </Text>
            <Text style={tagStyle}>
              {tags.map((tag, i) => {
                return (
                  <Text key={i} style={tagStyle}>
                    #{tag}{' '}
                  </Text>
                );
              })}
            </Text>
          </View>
          <View style={{ marginVertical: '2%' }}>
            <Text style={[propDefStyle, { marginTop: 10 }]}>Ekler: </Text>
          </View>
        </Card>
        {this.renderOptions()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  propDefStyle: {
    fontSize: deviceWidth / 26,
    fontWeight: '400'
  },
  descriptionStyle: {
    fontSize: deviceWidth / 28,
    color: '#555',
    padding: '3%',
    paddingBottom: 0
  },
  budgetStyle: {
    fontSize: deviceWidth / 26,
    justifyContent: 'flex-end',
    alignSelf: 'center'
  },
  deadlineStyle: {
    fontSize: deviceWidth / 26,
    color: 'grey',
    justifyContent: 'flex-end',
    borderBottomWidth: 0
  },
  tagStyle: {
    fontSize: deviceWidth / 28,
    color: 'steelblue',
    padding: '2%',
    paddingBottom: 0
  },
  buttonStyle: {
    borderRadius: 8,
    width: 100
  }
});

export default JobDetails;
