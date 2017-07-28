import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    inputStyle,
    labelStyle,
    keyboardType,
    autoCapitalize,
    autoFocus,
    multiline,
    numberOfLines,
    editable,
    maxLength
}) => {
    const { inputOwnStyle, labelOwnStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={[labelOwnStyle, labelStyle]}>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={[inputOwnStyle, inputStyle]}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={'#bbb'}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                autoFocus={autoFocus}
                multiline={multiline}
                numberOfLines={numberOfLines}
                editable={editable}
                maxLength={maxLength}
                autoCorrect={false}
            />
        </View>
    );
};

const styles = {
    inputOwnStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 3
    },
    labelOwnStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export { Input };