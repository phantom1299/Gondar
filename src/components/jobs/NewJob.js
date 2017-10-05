import React, { Component } from 'react';
import { Text, Keyboard, View, StyleSheet } from 'react-native';
import { Content } from 'native-base';
import { connect } from 'react-redux';
import { Card, Button, FormLabel, FormInput, Icon } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import trLocale from 'moment/locale/tr';

import {
  newMissionFormWillMount,
  newMissionFormTitleChanged,
  newMissionFormBudgetChanged,
  newMissionFormDeadlineChanged,
  newMissionFormDescriptionChanged,
  newMissionAdd
} from '../../actions';
import { CardSection, Spinner } from '../common';

moment.updateLocale('tr', trLocale);

class NewJob extends Component {
  constructor() {
    super();
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onBudgetChange = this.onBudgetChange.bind(this);
    this.onDeadlineChange = this.onDeadlineChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onTagAdd = this.onTagAdd.bind(this);
    this.onTagChange = this.onTagChange.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
    this.state = { height: 0, tag: '', date: moment() };
  }

  componentWillMount() {
    this.props.newMissionFormWillMount();
  }

  onTitleChange(title) {
    this.props.newMissionFormTitleChanged(title);
  }

  onBudgetChange(budget) {
    this.props.newMissionFormBudgetChanged(budget);
  }

  onDeadlineChange(deadline) {
    this.props.newMissionFormDeadlineChanged(deadline);
  }

  onDescriptionChange(description) {
    this.props.newMissionFormDescriptionChanged(description);
  }

  onButtonPress() {
    const { title, employerId, budget, description, tags } = this.props;
    const deadline = moment(this.state.date, 'DD MMM YY').toDate();
    Keyboard.dismiss();
    this.props.newMissionAdd({ title, employerId, deadline, budget, description, tags });
  }

  onTagChange(tag) {
    this.setState({ tag });
  }

  onTagAdd() {
    Keyboard.dismiss();
    if (this.state.tag !== '') {
      this.props.tags.push(this.state.tag);
    }
    this.setState({ tag: '' });
  }

  onTagDelete(i) {
    this.props.tags.splice(i, 1);
    this.forceUpdate();
  }

  renderTags() {
    return this.props.tags.map((tag, i) => {
      return (
        <Card flexDirection={'row'} containerStyle={styles.tagContainerStyle} key={i}>
          <Text style={styles.tagStyle}>{`#${tag}`}</Text>
          <Icon name={'clear'} size={20} onPress={this.onTagDelete.bind(this, i)} color={'#222'} />
        </Card>
      );
    });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }

    return (
      <View style={{ flex: 1 }}>
        <Button title={'Kaydet'} onPress={this.onButtonPress} backgroundColor={'#397af8'} />
      </View>
    );
  }

  render() {
    const { title, description, budget } = this.props;
    const {
      errorTextStyle,
      labelStyle,
      labelContainerStyle,
      inputStyle,
      inputContainerStyle,
      iconStyle,
      iconContainerStyle,
      tagInputStyle
    } = styles;
    return (
      <Content>
        <Card>
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <FormLabel labelStyle={labelStyle} containerStyle={labelContainerStyle}>
              İsim
            </FormLabel>
            <FormInput
              placeholder="İş ismi giriniz"
              inputStyle={inputStyle}
              containerStyle={inputContainerStyle}
              ref="form1"
              containerRef="isimInputContainer"
              textInputRef="isimInput"
              onChangeText={this.onTitleChange}
              value={title}
              autoCapitalize="words"
            />
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <FormLabel labelStyle={labelStyle} containerStyle={labelContainerStyle}>
              Bütçe
            </FormLabel>
            <FormInput
              inputStyle={inputStyle}
              containerStyle={inputContainerStyle}
              ref="form1"
              containerRef="isimInputContainer"
              textInputRef="isimInput"
              onChangeText={this.onBudgetChange}
              value={budget}
              keyboardType={'numeric'}
            />
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <FormLabel labelStyle={labelStyle} containerStyle={labelContainerStyle}>
              Deadline
            </FormLabel>
            <DatePicker
              style={{ width: '65%' }}
              date={this.state.date}
              mode="date"
              format="DD MMM YY"
              showIcon={false}
              androidMode="calendar"
              minDate={moment().format('DD MMM YY')}
              customStyles={{
                dateInput: {
                  marginRight: 18,
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: 'grey'
                },
                dateTouchBody: {}
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                this.setState({ date });
              }}
            />
          </View>

          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <FormLabel labelStyle={labelStyle} containerStyle={labelContainerStyle}>
              Açıklama
            </FormLabel>
            <FormInput
              inputStyle={inputStyle}
              containerStyle={inputContainerStyle}
              ref="form1"
              containerRef="isimInputContainer"
              textInputRef="isimInput"
              onChangeText={this.onDescriptionChange}
              value={description}
              multiline
              onContentSizeChange={event => {
                this.setState({ height: event.nativeEvent.contentSize.height });
              }}
              style={[{ marginTop: 4 }, { height: Math.max(10, this.state.height) }]}
            />
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 5 }}>
            <FormLabel labelStyle={labelStyle}>Etiket</FormLabel>
            <FormInput
              inputStyle={tagInputStyle}
              ref="form1"
              containerRef="tagInputContainer"
              textInputRef="tagInput"
              value={this.state.tag}
              onChangeText={this.onTagChange}
            />
            <Icon
              name={'add-circle'}
              size={30}
              color={'#28f'}
              iconStyle={iconStyle}
              containerStyle={iconContainerStyle}
              onPress={this.onTagAdd}
            />
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>{this.renderTags()}</View>
          <Button title="Dosya (yapılacak)" buttonStyle={{ marginTop: 10 }} />
          <Text style={errorTextStyle}>{this.props.error}</Text>
          <CardSection>{this.renderButton()}</CardSection>
        </Card>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#D8000C',
    marginLeft: 5
  },
  errorContainerStyle: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 20,
    padding: 5,
    borderRadius: 8,
    backgroundColor: '#FFBABA',
    justifyContent: 'center'
  },
  labelStyle: {
    fontSize: 18,
    fontWeight: '200',
    color: '#777',
    marginRight: 0,
    paddingRight: 0
  },
  labelContainerStyle: {
    flex: 5
  },
  inputContainerStyle: {
    flex: 9,
    marginLeft: 0
  },
  inputStyle: {
    fontSize: 18,
    height: 20,
    color: '#888',
    marginTop: 2,
    width: '100%'
  },
  tagInputStyle: {
    fontSize: 18,
    height: 20,
    width: 150,
    color: '#888',
    marginTop: 2
  },
  iconStyle: {},
  iconContainerStyle: {
    marginTop: 10
  },
  tagStyle: {
    fontSize: 16,
    color: 'white',
    marginRight: 5
  },
  tagContainerStyle: {
    marginRight: 4,
    marginLeft: 8,
    padding: 8,
    elevation: 1,
    backgroundColor: '#228b22aa',
    borderRadius: 8
  }
});

const mapStateToProps = ({ newMissionForm, auth }) => {
  const { title, budget, deadline, description, tags, error, loading } = newMissionForm;
  const employerId = auth.user._id;

  return { title, employerId, budget, deadline, description, tags, error, loading };
};

export default connect(mapStateToProps, {
  newMissionFormWillMount,
  newMissionFormTitleChanged,
  newMissionFormBudgetChanged,
  newMissionFormDeadlineChanged,
  newMissionFormDescriptionChanged,
  newMissionAdd
})(NewJob);
