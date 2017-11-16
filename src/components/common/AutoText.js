import React from 'react';
import { Dimensions } from 'react-native';
import { Text } from 'native-base';

const deviceWidth = Dimensions.get('window').width;

const AutoText = ({ style, children, note, fontSizeMultiplier = 1 }) => {
  const { textOwnStyle } = styles;
  return (
    <Text
      note={note}
      style={[
        textOwnStyle,
        style,
        { fontSize: (deviceWidth * fontSizeMultiplier) / 28 }
      ]}
    >
      {children}
    </Text>
  );
};

const styles = {
  textOwnStyle: {
    fontSize: deviceWidth / 26
  }
};
export { AutoText };
