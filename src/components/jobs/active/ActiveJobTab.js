import React, { Component } from 'react';
import {
  Container,
  Tab,
  Tabs,
  TabHeading,
  Button,
  Form,
  Item,
  Label,
  Input,
  Icon,
  Card,
  ListItem,
  CheckBox,
  Body,
  Thumbnail,
  Spinner,
  List
} from 'native-base';
import { Dimensions, View, Modal, ScrollView, StyleSheet } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import trLocale from 'moment/locale/tr';
import SearchInput, { createFilter } from 'react-native-search-filter';

import Details from './Details';
import Notes from './Notes';
import Missions from './Missions';
import { AutoText as Text } from '../../common';
import { createNote, createSubJob } from '../../../data';

const deviceWidth = Dimensions.get('window').width;
moment.updateLocale('tr', trLocale);
const KEYS_TO_FILTERS = ['name', 'surname'];

class ActiveJobTab extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerTitle = params.job ? `${params.job.title}` : '';
    let headerRight;
    if (params.onNotes) {
      headerRight = (
        <Button transparent small onPress={params.onNewNote ? params.onNewNote : () => null}>
          <Text style={{ fontSize: deviceWidth / 30, color: 'lightblue' }}>Not Ekle</Text>
        </Button>
      );
    } else if (params.onMissions) {
      headerRight = (
        <Button transparent small onPress={params.onNewMission ? params.onNewMission : () => null}>
          <Text style={{ fontSize: deviceWidth / 30, color: 'lightblue' }}>Görev Ekle</Text>
        </Button>
      );
    } else {
      headerRight = (
        <Button transparent small onPress={params ? console.log : () => null}>
          <Text style={{ fontSize: deviceWidth / 30, color: 'lightblue' }}>Düzenle</Text>
        </Button>
      );
    }
    const headerLeft = (
      <Button
        transparent
        light
        small
        iconLeft
        onPress={() => {
          navigation.state.params.updateJob();
          navigation.goBack();
        }}
      >
        <Icon name="arrow-back" />
      </Button>
    );
    return {
      headerStyle: { backgroundColor: '#4C3E54' },
      headerTintColor: 'white',
      headerLeft,
      headerTitle,
      headerRight,
      headerTitleStyle: { alignSelf: 'center', fontSize: deviceWidth / 26 }
    };
  };

  constructor() {
    super();
    this.onCreateSubJob = this.onCreateSubJob.bind(this);
    this.state = {
      modalVisible: false,
      searchTerm: '',
      participants: [],
      note: {
        text: ''
      },
      subJob: {
        title: '',
        description: '',
        part: '',
        date: moment().format('DD MMM YY')
      }
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onNotes: false,
      onMissions: false,
      onNewNote: this._onNewNote,
      onNewMission: this._onNewMission
    });
  }

  onChangeTab = tabsInfo => {
    if (tabsInfo.i === 1) {
      this.props.navigation.setParams({ onNotes: false, onMissions: true });
    } else if (tabsInfo.i === 2) {
      this.props.navigation.setParams({ onNotes: true, onMissions: false });
    } else {
      this.props.navigation.setParams({ onNotes: false, onMissions: false });
    }
  };

  _onNewNote = () => {
    this.setState({ modalVisible: true });
  };

  _onNewMission = () => {
    this.setState({ modalVisible: true });
  };

  onSubJobChange(text, i) {
    if (i === 0) {
      this.setState({ subJob: { ...this.state.subJob, title: text } });
    } else if (i === 1) {
      this.setState({ subJob: { ...this.state.subJob, description: text } });
    } else {
      this.setState({ subJob: { ...this.state.subJob, part: text } });
    }
  }

  onNoteChange(text, i) {
    if (i === 0) {
      this.setState({ note: { ...this.state.note, text } });
    }
  }

  onCreateNote() {
    this.setState({ loading: true });
    const { text } = this.state.note;
    createNote(this.props.navigation.state.params.job._id, {
      text,
      user: this.props.navigation.state.params.user._id
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            modalVisible: false,
            loading: false,
            note: { text: '' }
          });
          this.props.navigation.state.params.updateJob();
          this.props.navigation.goBack();
        } else {
          this.setState({
            error: `Sunucu ${response.status} hata kodunu döndürdü, lütfen tekrar deneyin.`,
            loading: false
          });
        }
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onCreateSubJob() {
    this.setState({ loading: true });
    const { title, description } = this.state.subJob;
    let part = parseInt(this.state.subJob.part, 10);
    part /= 100;
    const deadline = moment(this.state.subJob.date, 'DD MMM YY').toDate();
    createSubJob(this.props.navigation.state.params.job._id, {
      title,
      description,
      part,
      deadline,
      participants: this.state.participants
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({ modalVisible: false, loading: false, participants: [] });
          this.props.navigation.state.params.updateJob();
          this.props.navigation.goBack();
        } else {
          this.setState({
            error: `Sunucu ${response.status} hata kodunu döndürdü, lütfen tekrar deneyin.`,
            loading: false
          });
        }
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  showModal() {
    if (this.props.navigation.state.params.onNotes) {
      const { name, surname, avatarUrl } = this.props.navigation.state.params.user;
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
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              flexDirection: 'row',
              backgroundColor: '#0004'
            }}
          >
            <Form
              style={{ backgroundColor: '#eee', flex: 1, marginHorizontal: 10, borderRadius: 10 }}
            >
              <Text fontSizeMultiplier={1.5} style={{ alignSelf: 'center', margin: 10 }}>
                YENİ NOT
              </Text>
              <Item fixedLabel>
                <Label>İçerik</Label>
                <Input
                  value={this.state.note.text}
                  onChangeText={text => this.onNoteChange(text, 0)}
                />
              </Item>
              <Item fixedLabel>
                <Label>Dosya</Label>
                <Input placeholder={'YAPILACAK'} />
              </Item>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                {this.state.loading ? (
                  <Spinner style={{ flex: 1 }} />
                ) : (
                  [
                    <Button
                      style={{ flex: 1, justifyContent: 'center', borderRadius: 0 }}
                      transparent
                      onPress={() =>
                        this.setState({
                          modalVisible: false,
                          note: { text: '' }
                        })}
                    >
                      <Text>İptal</Text>
                    </Button>,
                    <Button
                      style={{ flex: 1, justifyContent: 'center' }}
                      onPress={() => this.onCreateNote()}
                    >
                      <Text>Ekle</Text>
                    </Button>
                  ]
                )}
              </View>
            </Form>
          </View>
        </Modal>
      );
    }
    const filteredParticipants = this.props.navigation.state.params.job.participants.filter(
      createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
    );
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
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#0004'
          }}
        >
          <Card>
            <Form>
              <Text fontSizeMultiplier={1.5} style={{ alignSelf: 'center', margin: 10 }}>
                YENİ GÖREV
              </Text>
              <Item fixedLabel>
                <Label>Başlık</Label>
                <Input
                  value={this.state.subJob.title}
                  onChangeText={text => this.onSubJobChange(text, 0)}
                />
              </Item>
              <Item fixedLabel>
                <Label>Açıklama</Label>
                <Input
                  value={this.state.subJob.description}
                  onChangeText={text => this.onSubJobChange(text, 1)}
                />
              </Item>
              <Item fixedLabel>
                <Label>Etkisi</Label>
                <Input
                  placeholder={'%'}
                  placeholderTextColor={'grey'}
                  value={this.state.subJob.part}
                  onChangeText={text => this.onSubJobChange(text, 2)}
                />
              </Item>
              <Item fixedLabel>
                <Label>Deadline</Label>
                <DatePicker
                  style={{ width: '65%' }}
                  date={this.state.subJob.date}
                  mode="date"
                  format="DD MMM YY"
                  showIcon={false}
                  androidMode="spinner"
                  minDate={moment().format('DD MMM YY')}
                  customStyles={{
                    dateInput: {
                      marginRight: 18,
                      borderWidth: 0,
                      borderBottomColor: 'grey'
                    },
                    dateTouchBody: {}
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={date => {
                    this.setState({
                      subJob: { ...this.state.subJob, date }
                    });
                  }}
                />
              </Item>
              <SearchInput
                onChangeText={term => {
                  this.searchUpdated(term);
                }}
                style={styles.searchInput}
                placeholder="Katılımcılarda ara..."
              />
              <List>
                {filteredParticipants.map((participant, i) => {
                  const checked =
                    participant._id ===
                    this.state.participants.find(id => {
                      return participant._id === id;
                    });
                  return (
                    <ListItem
                      button
                      onPress={() => {
                        if (checked) {
                          this.setState({
                            participants: this.state.participants.filter(p => p !== participant._id)
                          });
                        } else {
                          this.setState({
                            participants: this.state.participants.concat(participant._id)
                          });
                        }
                      }}
                      key={i}
                    >
                      <Body>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                          <Thumbnail
                            style={{ width: deviceWidth / 15, height: deviceWidth / 15 }}
                            source={{
                              uri:
                                participant.avatarUrl ||
                                'http://www.oldpotterybarn.co.uk/wp-content/uploads/2015/06/default-medium.png'
                            }}
                          />
                          <Text style={{ color: '#000', margin: 5 }}>
                            {participant.name} {participant.surname}
                          </Text>
                        </View>
                      </Body>
                      <CheckBox checked={checked} />
                    </ListItem>
                  );
                })}
              </List>
              <Text
                fontSizeMultiplier={1.2}
                style={{ padding: 10, color: 'red', textAlign: 'center' }}
              >
                {this.state.error}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                {this.state.loading ? (
                  <Spinner style={{ flex: 1 }} />
                ) : (
                  [
                    <Button
                      transparent
                      style={{ flex: 1, justifyContent: 'center', borderRadius: 0 }}
                      onPress={() => this.setState({ modalVisible: false, participants: [] })}
                    >
                      <Text>İptal</Text>
                    </Button>,
                    <Button
                      style={{ flex: 1, justifyContent: 'center' }}
                      onPress={() => this.onCreateSubJob()}
                    >
                      <Text>Ekle</Text>
                    </Button>
                  ]
                )}
              </View>
            </Form>
          </Card>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <Container>
        {this.showModal()}
        <Tabs initialPage={0} onChangeTab={this.onChangeTab}>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: '#78909C' }}>
                <Text style={{ fontSize: deviceWidth / 26 }}>Detaylar</Text>
              </TabHeading>
            }
          >
            <Details
              navigation={this.props.navigation}
              job={this.props.navigation.state.params.job}
              userId={this.props.navigation.state.params.user._id}
            />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: '#78909C' }}>
                <Text style={{ fontSize: deviceWidth / 26 }}>Görevler</Text>
              </TabHeading>
            }
          >
            <Missions
              navigation={this.props.navigation}
              jobId={this.props.navigation.state.params.job._id}
            />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: '#78909C' }}>
                <Text style={{ fontSize: deviceWidth / 26 }}>Notlar</Text>
              </TabHeading>
            }
          >
            <Notes
              notes={this.props.navigation.state.params.job.notes}
              participants={this.props.navigation.state.params.job.participants}
              employer={this.props.navigation.state.params.job.employer}
            />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  emailItem: {
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput: {
    width: deviceWidth,
    borderColor: '#CCC'
  }
});

export default ActiveJobTab;
