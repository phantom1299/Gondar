import React, { Component } from 'react';
import { Container, Content, Text, Tabs, Tab, Header } from 'native-base';

import DatePicker from 'react-native-datepicker';
import moment from 'moment';

export default class Ayarlar extends Component {
  constructor(props) {
    super(props);
    this.state = { date: '2016-05-15', tarih: moment.locale() };
    moment.locale('tr');
    const m = moment(1316116057189);
    this.state = { tarih: m.fromNow() };
  }

  render() {
    return (
      <Container>
        <Content>
          <Tabs initialPage={1}>
            <Tab heading="Tab1">
              <Text>Tab 1</Text>
            </Tab>
            <Tab heading="Tab2">
              <Text>Tab 2</Text>
            </Tab>
            <Tab heading="Tab3">
              <Text>Tab 3</Text>
            </Tab>
          </Tabs>
          <Text style={{ alignSelf: 'center', margin: 20 }}>({this.state.tarih})</Text>
          <Text style={{ alignSelf: 'center', margin: 20 }}>({moment().format('e')})</Text>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="DD-MM-YY"
            androidMode="spinner"
            minDate={moment().format('DD-MM-YY')}
            customStyles={{
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              this.setState({ date });
            }}
          />
        </Content>
      </Container>
    );
  }
}
