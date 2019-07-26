import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default () => {
  const [touched, onTouch] = useState(false);
  return (
    <View
      style={{
        width: 400,
        height: 400,
        backgroundColor: touched ? 'salmon' : 'blue',
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => onTouch(!touched)}
      >
        <Text style={{ color: 'white' }}>
          {touched ? 'Hooked on Love!' : 'Hooked on Science!'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
