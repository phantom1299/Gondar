import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
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
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import trLocale from 'moment/locale/tr';

import EmployerContent from './EmployerContent';

moment.updateLocale('tr', trLocale);

const asd = [
  {
    avatarUrl: 'https://randomuser.me/api/portraits/women/25.jpg',
    name: 'Ceyda',
    surname: 'Özdemir',
    tags: ['deneme', 'test', 'sunucu']
  },
  {
    avatarUrl: 'https://randomuser.me/api/portraits/men/17.jpg',
    name: 'Halil',
    surname: 'Demir',
    tags: ['deneme', 'test', 'sunucu']
  },
  {
    avatarUrl: 'https://randomuser.me/api/portraits/women/49.jpg',
    name: 'Aslı',
    surname: 'Dağdelen',
    tags: ['deneme', 'test', 'sunucu']
  }
];

const deviceWidth = Dimensions.get('window').width;

class ActiveJobDetail extends Component {
  componentWillMount() {
    const isEmployer = this.props.job.employer._id === this.props.userId;
    this.state = {
      isEmployer
    };
  }

  renderRow(participant) {
    return (
      <ListItem avatar>
        <Left>
          <Thumbnail small source={{ uri: participant.avatarUrl }} />
        </Left>
        <Body>
          <Text
            style={{ fontSize: deviceWidth / 26 }}
          >{`${participant.name} ${participant.surname}`}</Text>
          <Text style={{ color: 'steelblue', fontSize: deviceWidth / 28 }}>
            {participant.tags.map(tag => `#${tag} `)}
          </Text>
        </Body>
      </ListItem>
    );
  }

  renderUserDependingContent({ jobId, applicants, participants }) {
    if (this.state.isEmployer && this.props.job.hiring) {
      return <EmployerContent jobId={jobId} applicants={applicants} participants={participants} />;
    }
    return [
      <CardItem header style={{ justifyContent: 'center' }}>
        <Text style={{ fontSize: deviceWidth / 22 }}>Katılımcılar</Text>
      </CardItem>,
      asd.map(participant => this.renderRow(participant))
    ];
  }

  render() {
    const {
      _id,
      description,
      deadline,
      employer,
      budget,
      tags,
      applicants,
      participants
    } = this.props.job;
    const { propDefStyle, descriptionStyle, deadlineStyle, budgetStyle, tagStyle } = styles;

    return (
      <Container>
        <Content>
          <Card style={{ padding: 15 }}>
            <ListItem iconRight avatar style={{ marginLeft: 0, paddingLeft: 0, marginBottom: 10 }}>
              <Text style={[propDefStyle, { flex: 1 }]}>İş Veren: </Text>
              <Left>
                <Text style={{ fontSize: deviceWidth / 25 }}>
                  {employer.name} {employer.surname}
                </Text>
              </Left>
              <Thumbnail small blurRadius={1} source={{ uri: employer.avatarUrl }} />
            </ListItem>
            <View style={{ flexDirection: 'row', marginVertical: '2%' }}>
              <Text style={[propDefStyle, { flex: 1 }]}>Bütçe:</Text>
              <View style={{ flexDirection: 'row' }}>
                <FontAwesome
                  size={deviceWidth / 28}
                  name="try"
                  containerStyle={{ paddingRight: 2, paddingTop: 2 }}
                  color="#444"
                />
                <Text style={budgetStyle}>{budget} </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: '2%' }}>
              <Text style={[propDefStyle, { flex: 1 }]}>Son Teslim Tarihi: </Text>
              <Text style={deadlineStyle}>{moment(deadline).format('DD MMM YYYY')}</Text>
            </View>
            <View style={{ marginVertical: '2%' }}>
              <Text style={[propDefStyle, {}]}>Açıklama:</Text>
              <Text style={descriptionStyle}>{description}</Text>
            </View>
            <View style={{ marginVertical: '2%' }}>
              <Text style={propDefStyle}>Etiketler: </Text>
              <Text style={tagStyle}>
                {tags.map((tag, i) => {
                  return (
                    <Text key={i} style={tagStyle}>
                      #{tag}{' '}
                    </Text>
                  );
                })}
              </Text>
            </View>
            <View style={{ marginVertical: '2%' }}>
              <Text style={[propDefStyle, { marginTop: 10 }]}>Ekler: </Text>
            </View>
          </Card>
          <Card>{this.renderUserDependingContent({ jobId: _id, applicants, participants })}</Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  propDefStyle: {
    fontSize: deviceWidth / 26,
    fontWeight: '400'
  },
  descriptionStyle: {
    fontSize: deviceWidth / 28,
    color: '#555',
    padding: '3%',
    paddingBottom: 0
  },
  budgetStyle: {
    fontSize: deviceWidth / 26,
    justifyContent: 'flex-end',
    alignSelf: 'center'
  },
  deadlineStyle: {
    fontSize: deviceWidth / 26,
    color: 'grey',
    justifyContent: 'flex-end'
  },
  tagStyle: {
    fontSize: deviceWidth / 28,
    color: 'steelblue',
    padding: '2%',
    paddingBottom: 0
  },
  buttonStyle: {
    borderRadius: 8,
    width: 100
  }
});

export default ActiveJobDetail;
