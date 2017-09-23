import React, { Component } from 'react';
import { Alert } from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Text,
  Row,
  Col,
  Button
} from 'native-base';
import { connect } from 'react-redux';
import { deleteUser } from '../../actions';

class UserProfile extends Component {
  onDelete() {
    Alert.alert('Dikkat!', 'Kişiyi silmek istediğinizden emin misiniz?', [
      { text: 'İptal', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: 'Evet', onPress: () => this.props.deleteUser(this.props.user._id) },
      ''
    ]);
  }

  render() {
    console.log(this.props);
    const { user } = this.props;
    return (
      <Container>
        <Content>
          <Card>
            <Body>
              <Thumbnail large source={{ uri: user.avatarUrl || 'http://www.oldpotterybarn.co.uk/wp-content/uploads/2015/06/default-medium.png' }} />
              <Text style={{ fontSize: 28 }}>{user.name} {user.surname}</Text>
              <Text style={{ color: 'steelblue', fontSize: 18 }}>
                {user.tags.map(tag => `#${tag} `)}
              </Text>
            </Body>
            <CardItem>
              <Text>İletişim Bilgileri:</Text>
            </CardItem>
            <Row style={{ marginHorizontal: 20, marginVertical: 3 }}>
              <Col size={1}>
                <Text>Email: </Text>
              </Col>
              <Col size={3}>
                <Text note style={{ fontSize: 16 }}>
                  {user.email}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginHorizontal: 20, marginVertical: 3 }}>
              <Col size={1}>
                <Text>Tel: </Text>
              </Col>
              <Col size={3}>
                <Text note style={{ fontSize: 16 }}>
                  {user.telephone}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginHorizontal: 20, marginVertical: 3 }}>
              <Col size={1}>
                <Text>Adres: </Text>
              </Col>
              <Col size={3}>
                <Text note style={{ fontSize: 16 }}>
                  {user.address}
                </Text>
              </Col>
            </Row>
            <Button danger block style={{ margin: 10 }} onPress={() => this.onDelete()}>
              <Text>Sil</Text>
            </Button>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default connect(null, { deleteUser })(UserProfile);
