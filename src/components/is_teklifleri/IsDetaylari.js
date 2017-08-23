import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
  Alert
} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  ActionSheet
} from 'native-base';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { Icon, Button } from 'react-native-elements';

const İletişim = [
  { text: 'Telefon', icon: 'call', iconColor: '#2c8ef4' },
  { text: 'Email', icon: 'mail', iconColor: '#f42ced' },
  { text: 'Mesaj', icon: 'ios-chatboxes', iconColor: '#ea943b' },
  { text: 'İptal', icon: 'close', iconColor: '#25de5b' }
];
const CANCEL_INDEX = 4;

class IsDetaylari extends Component {
  constructor() {
    super();
    this.state = { selectedBasvuru: null, selectedOnay: null, visible: false };
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

  //TODO eğer ilan sahibi girdiyse, ona göre başvuranları görebilip seçebilecek (tamamlanmadı daha)
  //TODO eğer başka biri girdiyse, başvur seçeneğini ve iletişim seçeneğini görebilecek (yapılacak)
  renderUserDependingContent() {
    //if (user.tcKimlikNo === this.props.mission.isVeren.tcKimlikNo)
    return (
      <View>
        {this.renderBasvurular(this.props.mission.basvurular)}
        {this.renderOnaylananlar(this.props.mission.onaylananlar)}
      </View>
    );
  }

  renderUserDependingContentTags(tags) {
    return (
      <Text style={{ color: 'steelblue', marginLeft: 5 }}>
        {tags.map(tag => {
          return `#${tag} `;
        })}
      </Text>
    );
  }

  renderBasvuruOptions(selectedBasvuru) {
    if (this.state.selectedBasvuru === selectedBasvuru) {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
          <Button
            buttonStyle={styles.buttonStyle}
            title={'Reddet'}
            backgroundColor={'#d9534f'}
            icon={{
              name: 'cancel',
              size: 18
            }}
            onPress={() =>
              Alert.alert('Dikkat!', 'Kişiyi reddetmek istediğinizden emin misiniz?', [
                { text: 'İptal', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Evet', onPress: () => console.log('OK Pressed') },
                ''
              ])}
          />
          <Button
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
                  options: İletişim,
                  cancelButtonIndex: CANCEL_INDEX,
                  title: 'İletişim Seçenekleri'
                },
                buttonIndex => {
                  this.setState({ clicked: İletişim[buttonIndex] });
                }
              )}
          />
          <Button
            buttonStyle={styles.buttonStyle}
            title={'Onayla'}
            backgroundColor={'#5cb85c'}
            icon={{
              name: 'check-circle',
              size: 18
            }}
            onPress={() =>
              Alert.alert('Dikkat!', 'Kişiyi onaylamak istediğinizden emin misiniz?', [
                { text: 'İptal', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Evet', onPress: () => console.log('OK Pressed') },
                ''
              ])}
          />
        </View>
      );
    }
  }

  renderOnayOptions(selectedOnay) {
    if (this.state.selectedOnay === selectedOnay) {
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
          <Button
            buttonStyle={styles.buttonStyle}
            title={'Çıkar'}
            backgroundColor={'#d9534f'}
            icon={{
              name: 'cancel',
              size: 18
            }}
            onPress={() =>
              Alert.alert(
                'Dikkat!',
                'Kişiyi onaylananlardan çıkarmak istediğinizden emin misiniz?',
                [
                  { text: 'İptal', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                  { text: 'Evet', onPress: () => console.log('OK Pressed') }
                ]
              )}
          />
          <Button
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
                  options: İletişim,
                  cancelButtonIndex: CANCEL_INDEX,
                  title: 'İletişim Seçenekleri'
                },
                buttonIndex => {
                  this.setState({ clicked: İletişim[buttonIndex] });
                }
              )}
          />
        </View>
      );
    }
  }

  renderBasvurular(basvurular) {
    if (basvurular.length > 0) {
      return (
        <Card>
          <CardItem header style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Basvurular</Text>
          </CardItem>
          <List
            key={this.state.selectedBasvuru}
            dataArray={basvurular}
            renderRow={(basvuru, k, i) =>
              <View key={i}>
                <ListItem
                  button
                  onPress={() => {
                    this.state.selectedBasvuru === i
                      ? this.setState({ selectedBasvuru: null })
                      : this.setState({ selectedBasvuru: i, selectedOnay: null });
                  }}
                  avatar
                >
                  <Left>
                    <Thumbnail source={{ uri: basvuru.profilFotografiUrl }} />
                  </Left>
                  <Body>
                    <Text style={{ fontSize: 20 }}>
                      {basvuru.isim}
                    </Text>
                    <Text style={{ color: 'steelblue', marginLeft: 5 }}>
                      {basvuru.tags.map(tag => {
                        return `#${tag} `;
                      })}
                    </Text>
                  </Body>
                  <Right style={{ justifyContent: 'center' }}>
                    <Icon1
                      name={
                        this.state.selectedBasvuru === i ? 'keyboard-arrow-down' : 'chevron-right'
                      }
                      size={28}
                    />
                  </Right>
                </ListItem>
                {this.renderBasvuruOptions(i)}
              </View>}
          />
        </Card>
      );
    }
  }

  renderOnaylananlar(onaylananlar) {
    if (onaylananlar.length > 0) {
      return (
        <Card>
          <CardItem header style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Onaylananlar</Text>
          </CardItem>
          <List
            key={this.state.selectedOnay}
            dataArray={onaylananlar}
            renderRow={(onay, k, i) =>
              <View key={i}>
                <ListItem
                  button
                  onPress={() => {
                    this.state.selectedOnay === i
                      ? this.setState({ selectedOnay: null })
                      : this.setState({ selectedOnay: i, selectedBasvuru: null });
                  }}
                  avatar
                >
                  <Left>
                    <Thumbnail source={{ uri: onay.profilFotografiUrl }} />
                  </Left>
                  <Body>
                    <Text style={{ fontSize: 20 }}>
                      {onay.isim}
                    </Text>
                    <Text style={{ color: 'steelblue', marginLeft: 5 }}>
                      {onay.tags.map(tag => {
                        return `#${tag} `;
                      })}
                    </Text>
                  </Body>
                  <Right style={{ justifyContent: 'center' }}>
                    <Icon1
                      name={this.state.selectedOnay === i ? 'keyboard-arrow-down' : 'chevron-right'}
                      size={28}
                    />
                  </Right>
                </ListItem>
                {this.renderOnayOptions(i)}
              </View>}
          />
        </Card>
      );
    }
  }

  render() {
    const { butce, detay, tags, deadline, isVeren } = this.props.mission;
    const { propDefStyle, detayStyle, deadlineStyle, butceStyle, tagStyle } = styles;
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Card style={{ padding: 15 }}>
          <Text style={propDefStyle}>İş Veren: </Text>
          <ListItem iconRight avatar>
            <Left>
              <Thumbnail source={{ uri: isVeren.profilFotografiUrl }} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={{ fontSize: 20 }}>
                {isVeren.isim}
              </Text>
              <Text style={{ color: 'steelblue', marginLeft: 5 }}>
                {isVeren.tags.map(tag => {
                  return `#${tag} `;
                })}
              </Text>
            </Body>
            <TouchableOpacity
              transparent
              onPress={() =>
                ActionSheet.show(
                  {
                    options: İletişim,
                    cancelButtonIndex: CANCEL_INDEX,
                    title: 'İletişim Seçenekleri'
                  },
                  buttonIndex => {
                    this.setState({ clicked: İletişim[buttonIndex] });
                  }
                )}
            >
              <Icon1 name={'contact-mail'} size={28} style={{ color: 'skyblue' }} />
            </TouchableOpacity>
          </ListItem>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text style={[propDefStyle, { flex: 1 }]}>Bütçe:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={butceStyle}>
                {butce}{' '}
              </Text>
              <Icon
                size={16}
                type="font-awesome"
                name="try"
                containerStyle={{ paddingBottom: 15 }}
                color="#444"
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[propDefStyle, { flex: 1 }]}>Son Teslim Tarihi: </Text>
            <Text style={deadlineStyle}>
              {deadline}
            </Text>
          </View>
          <View>
            <Text style={[propDefStyle, {}]}>Açıklama:</Text>
            <Text style={detayStyle}>
              {detay}
            </Text>
          </View>
          <View>
            <Text style={propDefStyle}>Etiketler: </Text>
            <Text>
              {tags.map((tag, i) => {
                return (
                  <Text key={i} style={tagStyle}>
                    #{tag}{' '}
                  </Text>
                );
              })}
            </Text>
          </View>
          <View>
            <Text style={[propDefStyle, { marginTop: 10 }]}>Ekler: </Text>
          </View>
        </Card>
        {this.renderUserDependingContent()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  propDefStyle: {
    fontSize: 18,
    fontWeight: '500',
    paddingBottom: 10
  },
  detayStyle: {
    fontSize: 16,
    padding: 10,
    paddingTop: 0
  },
  butceStyle: {
    fontSize: 18,
    justifyContent: 'flex-end'
  },
  deadlineStyle: {
    fontSize: 18,
    justifyContent: 'flex-end'
  },
  tagStyle: {
    fontSize: 18,
    color: 'steelblue',
    justifyContent: 'flex-end'
  },
  basvurularHeaderStyle: {
    fontSize: 18,
    padding: 10,
    backgroundColor: 'rgba(30, 230, 245, 1)'
  },
  onaylananlarHeaderStyle: {
    fontSize: 18,
    padding: 10,
    backgroundColor: 'rgba(30, 245, 180, 1)'
  },
  buttonStyle: {
    borderRadius: 8,
    width: 100
  }
});

export default IsDetaylari;
