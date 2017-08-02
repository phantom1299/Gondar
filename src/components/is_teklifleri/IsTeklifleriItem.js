import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Icon, Card } from 'react-native-elements';

class IsTeklifleriItem extends Component {
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    Actions.isDetaylari({ ...this.props, title: this.props.mission.baslik });
  }

  render() {
    const {
      baslik,
      butce,
      detay,
      tags,
      deadline,
      isVeren
    } = this.props.mission;
    const {
      container,
      isVerenStyle,
      baslikStyle,
      detayStyle,
      tagStyle,
      butceStyle,
      deadlineStyle
    } = styles;
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Card>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 5, justifyContent: 'flex-end' }}>
              <Text style={baslikStyle}>
                {baslik}
              </Text>
            </View>
            <View
              style={{
                flex: 3,
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
            >
              <Text
                style={{
                  textDecorationLine: 'underline',
                  fontSize: 16,
                  alignSelf: 'flex-end'
                }}
              >
                Son Teslim Tarihi:
              </Text>
              <Text style={deadlineStyle}>
                {deadline}
              </Text>
            </View>
          </View>
          <View>
            <Text style={detayStyle} numberOfLines={3}>
              {detay}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 3, flexWrap: 'wrap' }}>
              <Text numberOfLines={2} style={tagStyle}>
                {tags.map((tag, i) => {
                  return (
                    <Text key={i}>
                      #{tag}{' '}
                    </Text>
                  );
                })}
              </Text>
            </View>
            <View
              style={{
                flex: 2,
                justifyContent: 'flex-end',
                flexDirection: 'row'
              }}
            >
              <Text style={butceStyle}>Bütçe: </Text>
              <Text
                style={{ color: '#000', fontSize: 18, alignSelf: 'flex-end' }}
              >
                {butce}{' '}
              </Text>
              <Icon
                size={16}
                type="font-awesome"
                name="try"
                containerStyle={{ alignSelf: 'flex-end', paddingBottom: 2 }}
                color="#444"
              />
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 15,
    backgroundColor: 'rgba(223, 250, 220, 0.5)'
  },
  baslikStyle: {
    fontSize: 19,
    color: '#000',
    marginBottom: 10,
    marginLeft: 10
  },
  detayStyle: {
    fontSize: 18,
    lineHeight: 18,
    paddingBottom: 20,
    paddingTop: 0,
    paddingLeft: 5
  },
  tagStyle: {
    color: 'blue',
    fontSize: 16
  },
  butceStyle: {
    fontSize: 18,
    alignSelf: 'flex-end'
  },
  deadlineStyle: {
    color: '#000',
    fontSize: 16,
    alignSelf: 'flex-end'
  }
});

export default IsTeklifleriItem;
