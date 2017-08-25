import React, { Component } from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Thumbnail,
  Text,
  Button,
  Icon
} from 'native-base';
import { ListView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

const kisiler = [
  {
    tcKimlikNo: '59653468490',
    profilFotografiUrl: 'https://randomuser.me/api/portraits/men/29.jpg',
    isim: 'Berat Karas',
    unvan: 'Yönetici',
    email: 'berat.karas@gmail.com',
    telefon: '589 923 5656',
    adres: 'Cihangir mah. Bozdağ sok. Avcılar İstanbul',
    tags: ['yönetici', 'iş veren']
  },
  {
    tcKimlikNo: '59653468490',
    profilFotografiUrl: 'https://randomuser.me/api/portraits/men/82.jpg',
    isim: 'Şamil Er',
    unvan: 'Çalışan',
    email: 'samil.er@gmail.com',
    telefon: '598 932 6565',
    adres: 'Cihangir mah. Bozdağ sok. Taksim İstanbul',
    tags: ['grafiker', 'tasarımcı']
  },
  {
    tcKimlikNo: '59653468490',
    profilFotografiUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
    isim: 'Kerem Asya',
    unvan: 'Çalışan',
    email: 'kreme.asya@gmail.com',
    telefon: '598 932 6565',
    adres: 'Cihangir mah. Bozdağ sok. Yok İstanbul',
    tags: ['grafiker', 'tasarımcı', 'editör']
  },
  {
    tcKimlikNo: '59653468490',
    profilFotografiUrl: 'https://randomuser.me/api/portraits/women/49.jpg',
    isim: 'Aslı Dağdelen',
    unvan: 'Çalışan',
    email: 'asli.dagdelen@gmail.com',
    telefon: '598 932 6565',
    adres: 'Cihangir mah. Bozdağ sok. Taksim İstanbul',
    tags: ['grafiker', 'tasarımcı']
  }
];

class KisilerList extends Component {
  constructor() {
    super();
    this.pressed = false;
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: kisiler
    };
  }
  onPressInfo(kisi) {
    if (!this.pressed) {
      this.pressed = true;
      setTimeout(() => {
        this.pressed = false;
      }, 2000);
      Actions.kisiProfili({ kisi, title: kisi.isim });
    }
  }

  onPressChat(kisi) {
    if (!this.pressed) {
      this.pressed = true;
      setTimeout(() => {
        this.pressed = false;
      }, 2000);
      Actions.mesajlar({ title: kisi.isim });
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <List
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={kisi =>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={{ uri: kisi.profilFotografiUrl }} />
                </Left>
                <Body>
                  <Text>
                    {kisi.isim}
                  </Text>
                  <Text note>
                    {kisi.unvan}
                  </Text>
                </Body>
              </ListItem>}
            renderLeftHiddenRow={() => null}
            renderRightHiddenRow={(kisi, secId, rowId, rowMap) =>
              <Body style={{ flexDirection: 'row' }}>
                <Left>
                  <Button
                    full
                    style={{ height: '100%' }}
                    onPress={this.onPressInfo.bind(this, kisi)}
                  >
                    <Icon active name="information-circle" />
                  </Button>
                </Left>
                <Right>
                  <Button
                    full
                    success
                    style={{ height: '100%' }}
                    onPress={this.onPressChat.bind(this, kisi)}
                  >
                    <Icon active name="ios-chatbubbles" />
                  </Button>
                </Right>
              </Body>}
            disableRightSwipe
            rightOpenValue={-150}
          />
        </Content>
      </Container>
    );
  }
}

export default KisilerList;
