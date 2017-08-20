import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Card, Slider } from 'react-native-elements';

class AktifIslerim extends Component {
  constructor() {
    super();
    this.state = { vlaue: 0.4 };
  }
  state = { value: 0.4 };
  
  render() {
    return (
      <Card containerStyle={{ marginTop: 10, width: 300 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1, justifyContent: 'flex-start', fontSize: 18 }}>İş Teklifi 1</Text>
          <Text style={{ alignSelf: 'flex-start' }}>8 gün kaldı</Text>
        </View>
        <Slider
          value={this.state.value}
          onValueChange={value => this.setState({ value })}
          maximumValue={100}
          thumbTouchSize={{ width: 100, height: 100 }}
          step={5}
        />
        <Text style={{ alignSelf: 'center' }}>
          %{this.state.value}
        </Text>
        <Text style={{ fontSize: 18, marginTop: 10 }}>Okunmamış 2 mesajın var:</Text>
        <TouchableOpacity>
          <Card containerStyle={{ margin: 0, padding: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 1, justifyContent: 'flex-start', fontSize: 14 }}>
                Kamil Şam:
              </Text>
              <Text style={{ alignSelf: 'flex-start' }}>23 dk önce</Text>
            </View>
            <View>
              <Text style={{ margin: 10, fontSize: 13 }}>
                İş Teklifi 1 ile ilgili mesaj...İş Teklifi 1 ile ilgili mesaj...İş Teklifi 1 ile
                ilgili mesaj...İş Teklifi 1 ile ilgili mesaj... İş Teklifi 1 ile ilgili mesaj...
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
        <TouchableOpacity>
          <Card containerStyle={{ margin: 0, padding: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 1, justifyContent: 'flex-start', fontSize: 14 }}>
                Kamil Şam:
              </Text>
              <Text style={{ alignSelf: 'flex-start' }}>45 dk önce</Text>
            </View>
            <View style={{ elevation: -5 }}>
              <Text style={{ margin: 10, fontSize: 13 }}>
                İş Teklifi 1 ile ilgili mesaj...İş Teklifi 1 ile ilgili mesaj...İş Teklifi 1 ile
                ilgili mesaj...İş Teklifi 1 ile ilgili mesaj... İş Teklifi 1 ile ilgili mesaj...
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
      </Card>
    );
  }
}

export default AktifIslerim;
