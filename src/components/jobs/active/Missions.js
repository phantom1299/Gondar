import React, { Component } from 'react';
import { Dimensions, Platform, UIManager, LayoutAnimation, TouchableOpacity } from 'react-native';
import { Content, Card, View, Thumbnail, Left } from 'native-base';
import * as Progress from 'react-native-progress';

import { AutoText as Text } from '../../common';

const missions = [
  {
    _id: 1,
    title: 'Dökümanları yaz', //işin başlığı
    description: 'Örnek görev 1 açıklama', //işin açıklaması
    participants: [{ name: 'Aslı', avatarUrl: 'https://randomuser.me/api/portraits/women/49.jpg' }], //iş teklifindeki çalışanın IDleri
    progress: 0.2, //tamamlanma yüzdesi
    notes: {} //notlar
  },
  {
    _id: 2,
    title: 'Yazılım Ücretlerini Araştır ve Raporla', //işin başlığı
    description: 'Örnek görev 2 açıklama', //işin açıklaması
    participants: [{ name: 'Halil', avatarUrl: 'https://randomuser.me/api/portraits/men/17.jpg' }], //iş teklifindeki çalışanın IDsi
    progress: 0.3, //tamamlanma yüzdesi
    notes: {} //notlar
  },
  {
    _id: 3,
    title: 'Örnek görev 3', //işin başlığı
    description: 'Örnek görev 3 açıklama', //işin açıklaması
    participants: [
      { name: 'Ceyda', avatarUrl: 'https://randomuser.me/api/portraits/women/25.jpg' },
      { name: 'Canıthın', avatarUrl: 'https://randomuser.me/api/portraits/men/82.jpg' }
    ], //iş teklifindeki çalışanın IDsi
    progress: 0.7, //tamamlanma yüzdesi
    notes: {} //notlar
  },
  {
    _id: 4,
    title: 'Örnek görev 4', //işin başlığı
    description: 'Örnek görev 4 açıklama', //işin açıklaması
    participants: [{ name: 'Jack', avatarUrl: 'https://randomuser.me/api/portraits/men/29.jpg' }], //iş teklifindeki çalışanın IDsi
    progress: 0.8, //tamamlanma yüzdesi
    notes: {} //notlar
  }
];

const deviceWidth = Dimensions.get('window').width;

class Missions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  componentWillMount() {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  getcolor(x = 0) {
    if (x >= 0.5) return '#5cb85c';
    return '#5bc0de';
  }

  renderDetails(mission) {
    if (mission._id === this.state.selected) {
      return (
        <Card>
          <Text>{mission.description}</Text>
        </Card>
      );
    }
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
    return (
      <Card key={_id} style={{ paddingHorizontal: '5%' }}>
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

  render() {
    return <Content>{missions.map(this.renderMission)}</Content>;
  }
}

export default Missions;
