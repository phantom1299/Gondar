import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
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
  ActionSheet,
  Spinner
} from 'native-base';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Icon, Button as Button1 } from 'react-native-elements';
import moment from 'moment';
import trLocale from 'moment/locale/tr';
import { JOB_DELETE_SUCCESS } from '../../../actions/types';

// import { AutoText as Text } from '../../common';
import {
  acceptApplicant,
  rejectApplicant,
  deleteJob,
  updateJobStatus,
  updateJobHiring
} from '../../../data';

moment.updateLocale('tr', trLocale);

const Contact = [
  { text: 'Telefon', icon: 'call', iconColor: '#2c8ef4' },
  { text: 'Email', icon: 'mail', iconColor: '#f42ced' },
  { text: 'Mesaj', icon: 'ios-chatboxes', iconColor: '#ea943b' },
  { text: 'İptal', icon: 'close', iconColor: '#25de5b' }
];
const CANCEL_INDEX = 4;

const deviceWidth = Dimensions.get('window').width;

class EmployerContent extends Component {
  constructor() {
    super();
    this.onAcceptApplicant = this.onAcceptApplicant.bind(this);
    this.onRejectApplicant = this.onRejectApplicant.bind(this);
    this.state = {
      selectedApplicant: null,
      selectedParticipant: null,
      loadingDelete: false,
      loadingHiring: false
    };
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    if (
      this.state.hiring === undefined &&
      this.state.applicants === undefined &&
      this.state.participants === undefined
    ) {
      this.setState({
        hiring: this.props.hiring,
        applicants: this.props.applicants,
        participants: this.props.participants
      });
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

  onUpdateJobStatus(status) {
    this.setState({ loadingStatus: true });
    updateJobStatus(this.props.jobId, status)
      .then(response => {
        if (response.status === 200) {
          this.setState({ loadingStatus: false });
          this.props.navigation.state.params.updateJob();
          this.props.navigation.goBack();
        }
        this.setState({ loadingStatus: false });
      })
      .catch(console.log);
  }

  onSetHiring(hiring) {
    this.setState({ loadingHiring: true });
    updateJobHiring(this.props.jobId, hiring)
      .then(response => {
        if (response.status === 200) {
          this.setState({ loadingHiring: false, hiring });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  onDeleteJob() {
    Alert.alert('Dikkat!', 'İş Teklifini kalıcı olarak silmek istediğinize emin misiniz??', [
      { text: 'İptal', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      {
        text: 'Evet',
        onPress: () => {
          this.setState({ loadingDelete: true });
          deleteJob(this.props.jobId)
            .then(() => {
              this.setState({ loadingDelete: false });
              this.props.navigation.dispatch({
                type: JOB_DELETE_SUCCESS,
                payload: this.props.jobId
              });
              this.props.navigation.goBack();
            })
            .catch(console.log);
        }
      },
      ''
    ]);
  }

  onAcceptApplicant = applicantId => {
    acceptApplicant(this.props.jobId, applicantId)
      .then(() => {
        this.setState({
          participants: this.state.participants.concat(
            this.state.applicants.find(el => el._id === applicantId)
          ),
          applicants: this.state.applicants.filter(e => e._id !== applicantId)
        });
      })
      .catch(console.log);
  };

  onRejectApplicant = applicantId => {
    rejectApplicant(this.props.jobId, applicantId)
      .then(() => {
        this.setState({
          applicants: this.state.applicants.filter(e => e._id !== applicantId)
        });
      })
      .catch(console.log);
  };

  renderDeleteButtonOrLoading() {
    if (this.state.loadingDelete) {
      return <Spinner />;
    }
    return (
      <Button danger block style={{ margin: 10 }} onPress={() => this.onDeleteJob()}>
        <Text>İş Teklifini Sil</Text>
      </Button>
    );
  }

  renderHiringButtonOrLoading() {
    if (this.state.loadingHiring) {
      return <Spinner />;
    }
    return (
      <Button
        info
        block
        style={{ margin: 10 }}
        onPress={() => this.onSetHiring(!this.state.hiring)}
      >
        {this.state.hiring ? <Text>İşİ Başvurulara Kapat</Text> : <Text>İşİ Başvurulara Aç</Text>}
      </Button>
    );
  }

  renderStartButtonOrLoading() {
    if (this.state.loadingStatus) {
      return <Spinner />;
    }
    return (
      <Button
        success
        block
        style={{ margin: 10 }}
        onPress={() => this.onUpdateJobStatus('started')}
      >
        <Text>İşi Başlat</Text>
      </Button>
    );
  }

  renderEndButtonOrLoading() {
    const disabled = this.props.progress !== 1;
    if (this.state.loadingStatus) {
      return <Spinner />;
    }
    return (
      <Button
        disabled={disabled}
        success
        block
        style={{ margin: 10, opacity: disabled ? 0.5 : 1 }}
        onPress={() => this.onUpdateJobStatus('finished')}
      >
        <Text>İşi Bitir</Text>
      </Button>
    );
  }

  renderApplicantOptions(selectedApplicant) {
    if (this.state.selectedApplicant === selectedApplicant) {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
          <Button1
            buttonStyle={styles.buttonStyle}
            title={'Reddet'}
            backgroundColor={'#d9534f'}
            icon={{
              name: 'cancel',
              size: 18
            }}
            onPress={() =>
              Alert.alert('Kişiyi reddetmek istediğinizden emin misiniz?', '', [
                { text: 'İptal', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Evet', onPress: () => this.onRejectApplicant(selectedApplicant) },
                ''
              ])}
          />
          <Button1
            buttonStyle={styles.buttonStyle}
            title={'İletişim'}
            backgroundColor={'#5bc0de'}
            icon={{
              name: 'contact-mail',
              size: 18
            }}
            onPress={() =>
              ActionSheet.show(
                {
                  options: Contact,
                  cancelButtonIndex: CANCEL_INDEX,
                  title: 'İletişim Seçenekleri'
                },
                buttonIndex => {
                  this.setState({ clicked: Contact[buttonIndex] });
                }
              )}
          />
          <Button1
            buttonStyle={styles.buttonStyle}
            title={'Onayla'}
            backgroundColor={'#5cb85c'}
            icon={{
              name: 'check-circle',
              size: 18
            }}
            onPress={() =>
              Alert.alert('Kişiyi onaylamak istediğinizden emin misiniz?', '', [
                { text: 'İptal', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Evet', onPress: () => this.onAcceptApplicant(selectedApplicant) },
                ''
              ])}
          />
        </View>
      );
    }
  }

  renderParticipantOptions(selectedParticipant) {
    if (this.state.selectedParticipant === selectedParticipant) {
      return (
        <View
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}
        >
          <Button
            style={styles.buttonStyle}
            danger
            onPress={() =>
              Alert.alert(
                'Dikkat!',
                'Kişiyi katılımcılardan çıkarmak istediğinizden emin misiniz?',
                [
                  { text: 'İptal', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                  { text: 'Evet', onPress: () => console.log('OK Pressed') }
                ]
              )}
          >
            <Text>Çıkar</Text>
          </Button>
          <Button
            style={styles.buttonStyle}
            success
            onPress={() =>
              ActionSheet.show(
                {
                  options: Contact,
                  cancelButtonIndex: CANCEL_INDEX,
                  title: 'İletişim Seçenekleri'
                },
                buttonIndex => {
                  this.setState({ clicked: Contact[buttonIndex] });
                }
              )}
          >
            <Text>İletişim</Text>
          </Button>
        </View>
      );
    }
  }

  renderApplicant(applicant, k, i) {
    return (
      <View key={i}>
        <ListItem
          button
          onPress={() => {
            this.state.selectedApplicant === applicant._id
              ? this.setState({ selectedApplicant: null })
              : this.setState({ selectedApplicant: applicant._id, selectedParticipant: null });
          }}
          avatar
        >
          <Left>
            <Thumbnail source={{ uri: applicant.avatarUrl }} />
          </Left>
          <Body>
            <Text style={{ fontSize: deviceWidth / 25 }}>
              {applicant.name} {applicant.surname}
            </Text>
            <Text
              style={{
                color: 'steelblue',
                marginLeft: 5,
                textAlign: 'center',
                fontSize: deviceWidth / 28
              }}
            >
              {applicant.tags
                ? applicant.tags.map(tag => {
                    return `#${tag} `;
                  })
                : null}
            </Text>
          </Body>
          <Right style={{ justifyContent: 'center' }}>
            <MaterialIcon
              name={
                this.state.selectedApplicant === applicant._id
                  ? 'keyboard-arrow-down'
                  : 'chevron-right'
              }
              size={deviceWidth / 18}
            />
          </Right>
        </ListItem>
        {this.renderApplicantOptions(applicant._id)}
      </View>
    );
  }

  renderApplicants(applicants) {
    if (applicants && applicants.length > 0) {
      return (
        <Card>
          <CardItem header style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: deviceWidth / 22 }}>Basvurular</Text>
          </CardItem>
          <List
            key={this.state.selectedApplicant}
            dataArray={applicants}
            renderRow={(applicant, k, i) => this.renderApplicant(applicant, k, i)}
          />
        </Card>
      );
    }
    return (
      <Card>
        <CardItem header style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: deviceWidth / 22 }}>Basvurular</Text>
        </CardItem>
        <Text
          style={{
            fontSize: deviceWidth / 28,
            alignSelf: 'center',
            marginBottom: 20,
            color: 'grey',
            fontStyle: 'italic'
          }}
        >
          Bekleyen başvuru yok.
        </Text>
      </Card>
    );
  }

  renderParticipants(participants) {
    if (participants.length > 0) {
      return (
        <Card>
          <CardItem header style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: deviceWidth / 22 }}>Katılımcılar</Text>
          </CardItem>
          <List
            key={this.state.selectedParticipant}
            dataArray={participants}
            renderRow={(participant, k, i) => (
              <View key={i}>
                <ListItem
                  button
                  onPress={() => {
                    this.state.selectedParticipant === participant._id
                      ? this.setState({ selectedParticipant: null })
                      : this.setState({
                          selectedParticipant: participant._id,
                          selectedApplicant: null
                        });
                  }}
                  avatar
                >
                  <Left>
                    <Thumbnail source={{ uri: participant.avatarUrl }} />
                  </Left>
                  <Body>
                    <Text style={{ fontSize: deviceWidth / 25 }}>{participant.name}</Text>
                    <Text style={{ color: 'steelblue', marginLeft: 5, fontSize: deviceWidth / 28 }}>
                      {participant.tags.map(tag => {
                        return `#${tag} `;
                      })}
                    </Text>
                  </Body>
                  <Right style={{ justifyContent: 'center' }}>
                    <MaterialIcon
                      name={
                        this.state.selectedParticipant === participant._id
                          ? 'keyboard-arrow-down'
                          : 'chevron-right'
                      }
                      size={deviceWidth / 18}
                    />
                  </Right>
                </ListItem>
                {this.renderParticipantOptions(participant._id)}
              </View>
            )}
          />
        </Card>
      );
    }
    return (
      <Card>
        <CardItem header style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: deviceWidth / 22 }}>Katılımcılar</Text>
        </CardItem>
        <Text
          style={{
            fontSize: deviceWidth / 28,
            alignSelf: 'center',
            marginBottom: 20,
            color: 'grey',
            fontStyle: 'italic'
          }}
        >
          İş teklifinde katılımcı yok.
        </Text>
      </Card>
    );
  }

  render() {
    return (
      <View>
        {this.state.hiring ? this.renderApplicants(this.state.applicants) : null}
        {this.renderParticipants(this.state.participants)}
        {this.renderHiringButtonOrLoading()}
        {this.props.status === 'created'
          ? this.renderStartButtonOrLoading()
          : this.renderEndButtonOrLoading()}
        {this.renderDeleteButtonOrLoading()}
      </View>
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
    flex: 1,
    justifyContent: 'center',
    borderRadius: 0
  }
});

export default EmployerContent;
