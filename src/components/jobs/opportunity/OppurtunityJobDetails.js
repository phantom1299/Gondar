import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, UIManager, Platform, Dimensions } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Card, ListItem, Left, Thumbnail, Text, Button, Spinner, Toast } from 'native-base';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import trLocale from 'moment/locale/tr';

// import { AutoText as Text } from '../../common';
import { applyToJob } from '../../../data';
import { APPLY_TO_JOB_SUCCESS } from '../../../actions/types';

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
    this.state = {
      loading: false,
      hasApplied: false
    };
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
    this.setState({ loading: true });
    applyToJob(jobId, userId)
      .then(response => {
        if (response.status === 200) {
          this.setState({ loading: false, hasApplied: true });
          Toast.show({
            text: 'Başvurunuz gerçekleşti!',
            position: 'bottom',
            buttonText: 'Tamam',
            type: 'success',
            duration: 2000
          });
          this.props.navigation.dispatch({
            type: APPLY_TO_JOB_SUCCESS,
            payload: jobId
          });
          this.props.navigation.state.params.updateJobs();
          this.props.navigation.goBack();
        } else {
          this.setState({ loading: false });
          Toast.show({
            text: 'Başvuru işleminiz tamamlanamadı! Lütfen tekrar deneyin.',
            position: 'bottom',
            buttonText: 'Tamam',
            type: 'danger',
            duration: 5000
          });
        }
      })
      .catch(err => {
        Toast.show({
          text: err,
          position: 'bottom',
          buttonText: 'Tamam',
          type: 'danger',
          duration: 5000
        });
      });
  };

  onCancel = (jobId, userId) => {
    console.log(jobId);
    console.log(userId);
  };

  renderApllyOrCancel(jobId, userId) {
    if (this.props.navigation.state.params && !this.props.navigation.state.params.fromAppliedJobs) {
      return (
        <Button
          onPress={() => this.onApply(jobId, userId)}
          style={{
            flex: 1,
            justifyContent: 'center',
            borderRadius: 0,
            opacity: this.state.hasApplied ? 0.8 : 1
          }}
          primary
        >
          <Text>Başvur</Text>
        </Button>
      );
    }
    return (
      <Button
        onPress={() => this.onCancel(jobId, userId)}
        style={{
          flex: 1,
          justifyContent: 'center',
          borderRadius: 0,
          opacity: this.state.hasApplied ? 0.8 : 1
        }}
        primary
      >
        <Text>Vazgeç</Text>
      </Button>
    );
  }

  renderOptions() {
    const { job, userId } = this.props.navigation.state.params;
    if (!this.state.loading) {
      return (
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
          <Button
            style={{ flex: 1, justifyContent: 'center', borderRadius: 0 }}
            onPress={() => console.log(this.props.navigation)}
            textStyle={{ textAlign: 'center' }}
            success
          >
            <Text>İletİşİme Geç</Text>
          </Button>
          {this.renderApllyOrCancel(job._id, userId)}
        </View>
      );
    }
    return <Spinner size={45} color="steelblue" />;
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
