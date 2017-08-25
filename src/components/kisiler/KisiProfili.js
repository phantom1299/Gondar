import React, { Component } from 'react';
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

class KisiProfili extends Component {
  render() {
    console.log(this.props);
    const { kisi } = this.props;
    return (
      <Container>
        <Content>
          <Card>
            <Body>
              <Thumbnail large source={{ uri: kisi.profilFotografiUrl }} />
              <Text style={{ fontSize: 28 }}>
                {kisi.isim}
              </Text>
              <Text style={{ color: 'steelblue', fontSize: 18 }}>
                {kisi.tags.map(tag => `#${tag} `)}
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
                  {kisi.email}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginHorizontal: 20, marginVertical: 3 }}>
              <Col size={1}>
                <Text>Tel: </Text>
              </Col>
              <Col size={3}>
                <Text note style={{ fontSize: 16 }}>
                  {kisi.telefon}
                </Text>
              </Col>
            </Row>
            <Row style={{ marginHorizontal: 20, marginVertical: 3 }}>
              <Col size={1}>
                <Text>Adres: </Text>
              </Col>
              <Col size={3}>
                <Text note style={{ fontSize: 16 }}>
                  {kisi.adres}
                </Text>
              </Col>
            </Row>
            <Button danger block style={{ margin: 10 }}>
              <Text>Sil</Text>
            </Button>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default KisiProfili;
