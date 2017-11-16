import React, { Component } from 'react';
import { Container, Tab, Tabs, TabHeading, Text, Button, Form, Item, Input } from 'native-base';
import { Dimensions, View, Modal } from 'react-native';

import Details from './Details';
import Notes from './Notes';
import Missions from './Missions';

const deviceWidth = Dimensions.get('window').width;

class ActiveJobTab extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const headerTitle = params.job ? `${params.job.title}` : '';
    const headerRight = params.onNotes ? (
      <Button transparent small onPress={params.onNewNote ? params.onNewNote : () => null}>
        <Text style={{ fontSize: deviceWidth / 30, color: 'lightblue' }}>Not Ekle</Text>
      </Button>
    ) : (
      <View />
    );
    return {
      headerStyle: { backgroundColor: '#4C3E54' },
      headerTintColor: 'white',
      headerTitle,
      headerRight,
      headerTitleStyle: { alignSelf: 'center', fontSize: deviceWidth / 26 }
    };
  };

  constructor() {
    super();
    this.state = {
      modalVisible: false
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ onNotes: false, onNewNote: this._onNewNote });
  }

  // onChangeTab = () => {
  //   this.props.navigation.setParams({ onNotes: !this.props.navigation.state.params.onNotes });
  // };

  _onNewNote = () => {
    this.setState({ modalVisible: true });
  };

  render() {
    return (
      <Container>
        <Modal
          animationType="fade"
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
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
              <Item>
                <Input />
              </Item>
              <Item last>
                <Input />
              </Item>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button transparent onPress={() => this.setState({ modalVisible: false })}>
                  <Text>İptal</Text>
                </Button>
                <Button
                  transparent
                  onPress={() => {
                    this.setState({ modalVisible: false });
                  }}
                >
                  <Text>Ekle</Text>
                </Button>
              </View>
            </Form>
          </View>
        </Modal>
        <Tabs initialPage={0} onChangeTab={this.onChangeTab}>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: '#78909C' }}>
                <Text style={{ fontSize: deviceWidth / 26 }}>Detaylar</Text>
              </TabHeading>
            }
          >
            <Details
              job={this.props.navigation.state.params.job}
              userId={this.props.navigation.state.params.userId}
            />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: '#78909C' }}>
                <Text style={{ fontSize: deviceWidth / 26 }}>Görevler</Text>
              </TabHeading>
            }
          >
            <Missions job={this.props.navigation.state.params.job} />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: '#78909C' }}>
                <Text style={{ fontSize: deviceWidth / 26 }}>Notlar</Text>
              </TabHeading>
            }
          >
            <Notes notes={this.props.navigation.state.params.job.notes} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default ActiveJobTab;
