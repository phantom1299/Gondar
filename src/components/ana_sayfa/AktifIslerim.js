import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Content, Card, Text,  } from 'native-base';
import { Slider } from 'react-native-elements';

class AktifIslerim extends Component {
  constructor() {
    super();
    this.state = { value: 65 };
  }

  render() {
    return (
      <Container>
        <Content>
          <Text style={{ alignSelf: 'center', margin: 20 }} >(Yapılacak)</Text>
          <Card style={{ padding: 10, marginLeft: 10, marginRight: 10, marginTop: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 1, justifyContent: 'flex-start', fontSize: 18 }}>
                Dergi Kapak Tasarımı
              </Text>
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
          </Card>
        </Content>
      </Container>
    );
  }
}

export default AktifIslerim;
