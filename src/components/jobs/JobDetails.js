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

class JobDetails extends Component {
  constructor() {
    super();
    this.state = { selectedApplication: null, selectedParticipant: null, visible: false };
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
    //if (user.tcKimlikNo === this.props.job.employer.tcKimlikNo)
    return (
      <View>
        {this.renderApplications(this.props.job.applications)}
        {this.renderParticipants(this.props.job.participants)}
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

  renderApplicationOptions(selectedApplication) {
    if (this.state.selectedApplication === selectedApplication) {
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

  renderParticipantOptions(selectedParticipant) {
    if (this.state.selectedParticipant === selectedParticipant) {
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
                'Kişiyi katılımcılardan çıkarmak istediğinizden emin misiniz?',
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

  renderApplications(applications) {
    if (applications.length > 0) {
      return (
        <Card>
          <CardItem header style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Basvurular</Text>
          </CardItem>
          <List
            key={this.state.selectedApplication}
            dataArray={applications}
            renderRow={(application, k, i) =>
              <View key={i}>
                <ListItem
                  button
                  onPress={() => {
                    this.state.selectedApplication === i
                      ? this.setState({ selectedApplication: null })
                      : this.setState({ selectedApplication: i, selectedParticipant: null });
                  }}
                  avatar
                >
                  <Left>
                    <Thumbnail source={{ uri: application.avatarU }} />
                  </Left>
                  <Body>
                    <Text style={{ fontSize: 20 }}>
                      {application.name} {application.surname}
                    </Text>
                    <Text style={{ color: 'steelblue', marginLeft: 5 }}>
                      {application.tags.map(tag => {
                        return `#${tag} `;
                      })}
                    </Text>
                  </Body>
                  <Right style={{ justifyContent: 'center' }}>
                    <Icon1
                      name={
                        this.state.selectedApplication === i ? 'keyboard-arrow-down' : 'chevron-right'
                      }
                      size={28}
                    />
                  </Right>
                </ListItem>
                {this.renderApplicationOptions(i)}
              </View>}
          />
        </Card>
      );
    }
  }

  renderParticipants(participants) {
    if (participants.length > 0) {
      return (
        <Card>
          <CardItem header style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Katılımcılar</Text>
          </CardItem>
          <List
            key={this.state.selectedParticipant}
            dataArray={participants}
            renderRow={(participant, k, i) =>
              <View key={i}>
                <ListItem
                  button
                  onPress={() => {
                    this.state.selectedParticipant === i
                      ? this.setState({ selectedParticipant: null })
                      : this.setState({ selectedParticipant: i, selectedApplication: null });
                  }}
                  avatar
                >
                  <Left>
                    <Thumbnail source={{ uri: participant.avatarU }} />
                  </Left>
                  <Body>
                    <Text style={{ fontSize: 20 }}>
                      {participant.name}
                    </Text>
                    <Text style={{ color: 'steelblue', marginLeft: 5 }}>
                      {participant.tags.map(tag => {
                        return `#${tag} `;
                      })}
                    </Text>
                  </Body>
                  <Right style={{ justifyContent: 'center' }}>
                    <Icon1
                      name={this.state.selectedParticipant === i ? 'keyboard-arrow-down' : 'chevron-right'}
                      size={28}
                    />
                  </Right>
                </ListItem>
                {this.renderParticipantOptions(i)}
              </View>}
          />
        </Card>
      );
    }
  }

  render() {
    const { budget, detail, tags, deadline, employer } = this.props.job;
    const { propDefStyle, detailStyle, deadlineStyle, budgetStyle, tagStyle } = styles;
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Card style={{ padding: 15 }}>
          <Text style={propDefStyle}>İş Veren: </Text>
          <ListItem iconRight avatar>
            <Left>
              <Thumbnail source={{ uri: employer.avatarU }} />
            </Left>
            <Body style={{ borderBottomWidth: 0 }}>
              <Text style={{ fontSize: 20 }}>
                {employer.name}
              </Text>
              <Text style={{ color: 'steelblue', marginLeft: 5 }}>
                {employer.tags.map(tag => {
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
              <Text style={budgetStyle}>
                {budget}{' '}
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
            <Text style={detailStyle}>
              {detail}
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
  detailStyle: {
    fontSize: 16,
    padding: 10,
    paddingTop: 0
  },
  budgetStyle: {
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
  buttonStyle: {
    borderRadius: 8,
    width: 100
  }
});

export default JobDetails;
