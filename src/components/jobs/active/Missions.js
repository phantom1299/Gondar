import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
  Dimensions,
  Platform,
  UIManager,
  LayoutAnimation,
  Modal,
  TouchableOpacity,
  Slider,
  Alert
} from 'react-native';
import {
  Content,
  Card,
  CardItem,
  View,
  Thumbnail,
  Left,
  Button,
  Spinner,
  Toast
} from 'native-base';
import * as Progress from 'react-native-progress';

import { AutoText as Text } from '../../common';
import { updateSubJobProgress, getSubJobsOfJob, deleteSubJob } from '../../../data';

const deviceWidth = Dimensions.get('window').width;

class Missions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      modalVisible: false,
      missions: [],
      loadingForMissions: true,
      loading: false
    };
  }

  componentWillMount() {
    if (this.state.selected === null) this.getSubJobs();
  }

  getSubJobs() {
    getSubJobsOfJob(this.props.jobId)
      .then(response => {
        if (response.status === 200) {
          response.json().then(result => {
            this.setState({ missions: result, loadingForMissions: false });
          });
        }
        this.setState({
          error: `Sunucu ${response.status} hata kodunu döndürdü, lütfen tekrar deneyin.`
        });
      })
      .catch(error => {
        this.getSubJobs();
      });
  }

  // componentWillMount() {
  //   if (Platform.OS === 'android') {
  //     UIManager.setLayoutAnimationEnabledExperimental(true);
  //   }
  // }

  // componentWillUpdate() {
  //   LayoutAnimation.spring();
  // }

  getcolor(x = 0) {
    if (x >= 0.5) return '#5cb85c';
    return '#5bc0de';
  }

  onDeleteSubJob() {
    this.setState({ loadingDelete: true });
    deleteSubJob(this.props.jobId, this.state.selected)
      .then(() => {
        this.setState({ loadingDelete: false });
        this.props.navigation.state.params.updateJob();
        this.props.navigation.goBack();
      })
      .catch(error => {
        this.setState({ loadingDelete: false, error });
      });
  }

  showModal() {
    const formatedProgress = Math.round(this.state.progress * 100);
    return (
      <Modal
        animationType="fade"
        transparent
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setState({ modalVisible: false });
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0004'
          }}
        >
          <Card
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 0,
              paddingTop: '5%'
            }}
          >
            <Slider
              style={{ width: deviceWidth }}
              step={0.05}
              onSlidingComplete={progress => this.setState({ progress })}
              value={this.state.progress}
            />
            <Text>{`${formatedProgress}%`}</Text>
            {this.state.loading ? (
              <Spinner />
            ) : (
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button transparent onPress={() => this.setState({ modalVisible: false })}>
                  <Text>İptal</Text>
                </Button>
                <Button
                  transparent
                  onPress={() => {
                    this.setState({ loading: true });
                    updateSubJobProgress(
                      this.props.jobId,
                      this.state.selected,
                      formatedProgress / 100
                    )
                      .then(response => {
                        if (response.status === 200) {
                          this.setState({ modalVisible: false, loading: false });
                          this.props.navigation.state.params.updateJob();
                          this.props.navigation.goBack();
                        } else this.setState({ modalVisible: false, loading: false });
                      })
                      .catch(() => {
                        this.setState({ modalVisible: false, loading: false });
                      });
                  }}
                >
                  <Text>Tamam</Text>
                </Button>
              </View>
            )}
          </Card>
        </View>
      </Modal>
    );
  }

  renderParticipant(participant) {
    return (
      <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
        <Thumbnail
          style={{ width: deviceWidth / 15, height: deviceWidth / 15 }}
          source={{
            uri:
              participant.avatarUrl ||
              'http://www.oldpotterybarn.co.uk/wp-content/uploads/2015/06/default-medium.png'
          }}
        />
        <Text style={{ color: '#000', margin: 5 }}>{participant.name}</Text>
      </View>
    );
  }

  renderMission = mission => {
    const { _id, title, participants, progress } = mission;
    const fade = this.state.selected !== null && this.state.selected !== _id;
    return (
      <Card key={_id} style={{ paddingHorizontal: '5%', opacity: fade ? 0.6 : 1 }}>
        <TouchableOpacity
          onPress={() => {
            if (this.state.selected === _id) this.setState({ selected: null });
            else this.setState({ selected: _id });
            console.log(this.state.selected);
          }}
        >
          <View style={{ paddingVertical: '2%', flexDirection: 'row' }}>
            <Left>
              <Text fontSizeMultiplier={1.1} style={{ color: '#000' }}>
                {title}
              </Text>
            </Left>
            <Text style={{ color: '#000' }} fontSizeMultiplier={1}>
              2 gün kaldı
            </Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            {participants.map(participant => this.renderParticipant(participant))}
          </View>
          <Progress.Bar
            style={{ marginVertical: '2%' }}
            borderRadius={0}
            borderWidth={0}
            unfilledColor={`${this.getcolor(progress)}55`}
            color={`${this.getcolor(progress)}aa`}
            progress={progress}
            width={deviceWidth / 1.1}
            children={
              <Text
                style={{
                  color: '#000',
                  backgroundColor: '#fff',
                  paddingLeft: `${progress * 100 - 2.5}%`,
                  fontSize: deviceWidth / 30
                }}
              >
                {`${progress * 100}%`}
              </Text>
            }
          />
        </TouchableOpacity>
        {this.renderDetails(mission)}
      </Card>
    );
  };

  renderDetails(mission) {
    if (mission._id === this.state.selected) {
      return [
        <CardItem>
          <Text>{mission.description}</Text>
        </CardItem>,
        <CardItem>
          <Button style={{ flex: 1, justifyContent: 'center' }} info small>
            <Text>Görevi Güncelle</Text>
          </Button>
          <Button
            style={{ flex: 1, justifyContent: 'center' }}
            onPress={() => this.setState({ modalVisible: true, progress: mission.progress })}
            warning
            small
          >
            <Text>Yüzdeyi Güncelle</Text>
          </Button>
        </CardItem>,
        <CardItem>
          {this.state.loadingDelete ? (
            <Spinner style={{ flex: 1 }} />
          ) : (
            <Button
              style={{ flex: 1, justifyContent: 'center' }}
              onPress={() =>
                Alert.alert(
                  'Görevi silmek istediğinize emin misiniz?',
                  'Bu işlem, görevi kalıcı olarak silecek.',
                  [
                    {
                      text: 'İptal',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel'
                    },
                    {
                      text: 'Evet',
                      onPress: () => this.onDeleteSubJob()
                    }
                  ],
                  { cancelable: false }
                )}
              danger
              small
            >
              <Text>Görevi Sil</Text>
            </Button>
          )}
        </CardItem>
      ];
    }
  }

  render() {
    return (
      <Content>
        {this.showModal()}
        {this.state.loadingForMissions ? (
          <Spinner style={{ margin: '20%' }} />
        ) : (
          this.state.missions.map(this.renderMission)
        )}
      </Content>
    );
  }
}

export default Missions;
