import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Card, Icon, List, ListItem, Divider } from 'react-native-elements';

class IsDetaylari extends Component {
  renderUserDependingContentTags(tags) {
    return (
      <Text style={{ color: 'blue', marginLeft: 5 }}>
        {tags.map(tag => {
          return `#${tag} `;
        })}
      </Text>
    );
  }
  //TODO eğer ilan sahibi girdiyse, ona göre başvuranları görebilip seçebilecek (tamamlanmadı daha)
  //TODO eğer başka biri girdiyse, başvur seçeneğini ve iletişim seçeneğini görebilecek (yapılacak)
  renderUserDependingContent() {
    //if (user.tcKimlikNo === this.props.mission.isVeren.tcKimlikNo)
    return (
      <View>
        {this.renderBasvurular(this.props.mission.basvurular)}
        {this.renderOnaylananlar(this.props.mission.onaylananlar)}
      </View>
    );
  }

  renderBasvurular(basvurular) {
    if (basvurular.length > 0) {
      return (
        <List title="Basvurular" containerStyle={{ padding: 0 }}>
          <Text style={styles.listHeaderStyle}>Basvurular</Text>
          <Divider style={{ backgroundColor: '#bbb' }} />
          {basvurular.map((l, i) =>
            <ListItem
              roundAvatar
              avatar={{ uri: l.profilFotografiUrl }}
              avatarStyle={{ width: 50, height: 50, borderRadius: 25 }}
              avatarContainerStyle={{ width: 50, height: 50, borderRadius: 25, marginLeft: 10 }}
              avatarOverlayContainerStyle={{ width: 50, height: 50, borderRadius: 25 }}
              containerStyle={{ height: 70 }}
              key={i}
              onPress={console.log(i)}
              title={l.isim}
              titleStyle={{ fontSize: 20, paddingBottom: 3, paddingTop: 3 }}
              titleContainerStyle={{ marginLeft: 40 }}
              subtitle={this.renderUserDependingContentTags(l.tags)}
              subtitleContainerStyle={{ marginLeft: 40 }}
            />
          )}
        </List>
      );
    }
  }

  renderOnaylananlar(onaylananlar) {
    if (onaylananlar.length > 0) {
      return (
        <List title="Onaylananlar" containerStyle={{ padding: 0 }}>
          <Text style={styles.listHeaderStyle}>Onaylananlar</Text>
          <Divider style={{ backgroundColor: '#bbb' }} />
          {onaylananlar.map((l, i) =>
            <ListItem
              roundAvatar
              avatar={{ uri: l.profilFotografiUrl }}
              avatarStyle={{ width: 50, height: 50, borderRadius: 25 }}
              avatarContainerStyle={{ width: 50, height: 50, borderRadius: 25, marginLeft: 10 }}
              avatarOverlayContainerStyle={{ width: 50, height: 50, borderRadius: 25 }}
              containerStyle={{ height: 70 }}
              key={i}
              onPress={console.log(i)}
              title={l.isim}
              titleStyle={{ fontSize: 20, paddingBottom: 3, paddingTop: 3 }}
              titleContainerStyle={{ marginLeft: 40 }}
              subtitle={this.renderUserDependingContentTags(l.tags)}
              subtitleContainerStyle={{ marginLeft: 40 }}
            />
          )}
        </List>
      );
    }
  }

  render() {
    const { butce, detay, tags, deadline, isVeren } = this.props.mission;
    const { propDefStyle, isVerenStyle, detayStyle, deadlineStyle, butceStyle, tagStyle } = styles;
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Card>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[propDefStyle, { flex: 1 }]}>İş Veren: </Text>
            <Text style={isVerenStyle}>
              {isVeren.isim}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[propDefStyle, { flex: 1 }]}>Bütçe:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={butceStyle}>
                {butce}{' '}
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
            <Text style={detayStyle}>
              {detay}
            </Text>
          </View>
          <View>
            <Text style={propDefStyle}>Etiketler: </Text>
            <Text style={tagStyle}>
              {tags.map((tag, i) => {
                return (
                  <Text key={i}>
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
    fontWeight: 'bold',
    paddingBottom: 10
  },
  isVerenStyle: {
    fontSize: 18,
    justifyContent: 'flex-end'
  },
  detayStyle: {
    fontSize: 16,
    padding: 10,
    paddingTop: 0
  },
  butceStyle: {
    fontSize: 18,
    justifyContent: 'flex-end'
  },
  deadlineStyle: {
    fontSize: 18,
    justifyContent: 'flex-end'
  },
  tagStyle: {
    fontSize: 18,
    color: 'blue',
    justifyContent: 'flex-end'
  },
  listHeaderStyle: {
    fontSize: 18,
    padding: 10,
    alignSelf: 'center'
  }
});

export default IsDetaylari;
