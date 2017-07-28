import React, { Component } from 'react';
import { Text, Keyboard, TextInput } from 'react-native';
import { connect } from 'react-redux';
import {
    newMissionFormWillMount,
    newMissionFormNameChanged,
    newMissionFormEmployerChanged,
    newMissionFormBudgetChanged,
    newMissionFormDeadlineChanged,
    newMissionFormDescriptionChanged,
    newMissionAdd
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class KisiEkle extends Component {

    componentWillMount() {
        this.props.newMissionFormWillMount();
    }

    onNameChange(name) {
        this.props.newMissionFormNameChanged(name);
    }

    onEmployerChange(employer) {
        this.props.newMissionFormEmployerChanged(employer);
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

    onButtonPress({ name, employer, budged, deadline, description }) {
        Keyboard.dismiss();
        this.props.newMissionAdd({ name, employer, budged, deadline, description });
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)} >
                Ekle
                </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="İsim"
                        placeholder="İş ismi giriniz"
                        onChangeText={this.onNameChange.bind(this)}
                        value={this.props.name}
                        autoCapitalize="words"
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="İş Veren"
                        placeholder="İş Verenin ismini giriniz"
                        onChangeText={this.onEmployerChange.bind(this)}
                        value={this.props.employer}
                        autoCapitalize="words"
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Bütçe"
                        placeholder="550"
                        onChangeText={this.onBudgetChange.bind(this)}
                        value={this.props.budget}
                        keyboardType={'numeric'}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Deadline"
                        placeholder="28/07/2017"
                        onChangeText={this.onDeadlineChange.bind(this)}
                        value={this.props.deadline}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Açıklama"
                        placeholder="İş hakkında açıklama giriniz"
                        onChangeText={this.onDescriptionChange.bind(this)}
                        value={this.props.description}
                        multiline
                        numberOfLines={4}
                        editable
                        maxLength={40}
                    />
                </CardSection>

                <Text style={styles.errosTextStyle}>
                    {this.props.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errosTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = ({ newMissionForm }) => {
    const { name, employer, budget, deadline, description, error, loading } = newMissionForm;

    return { name, employer, budget, deadline, description, error, loading };
};

export default connect(mapStateToProps, {
    newMissionFormWillMount,
    newMissionFormNameChanged,
    newMissionFormEmployerChanged,
    newMissionFormBudgetChanged,
    newMissionFormDeadlineChanged,
    newMissionFormDescriptionChanged,
    newMissionAdd
})(KisiEkle);
