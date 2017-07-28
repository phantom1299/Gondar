import React, { Component } from 'react';
import { Text, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  
    componentWillUnmount() {
        Keyboard.dismiss();
    }

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        Keyboard.dismiss();
        const { email, password } = this.props;
        this.props.loginUser({ email, password });
    }

    renderButton() {
        if (this.props.loading) {
            return <Spinner />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)} >
                Giriş Yap
                </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="user@example.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
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

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;

    return { email, password, error, loading };
};

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginUser
})(LoginForm);
