/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, StyleSheet } from 'react-native';
import { PaddedView, TextInput } from '@apollosproject/ui-kit';
import { SafeAreaView } from 'react-navigation';

import {
  NextButtonRow,
  NextButton,
  TitleText,
  PromptText,
  BrandIcon,
} from '../styles';

const Verification = ({
  confirmationTitleText,
  confirmationPromptText,
  brand,
  errors,
  handleLogin,
  handleSubmit,
  isSubmitting,
  isValid,
  setFieldValue,
  touched,
  values,
}) => (
  <SafeAreaView style={StyleSheet.absoluteFill}>
    <ScrollView>
      <PaddedView>
        {brand}
        <TitleText>{confirmationTitleText}</TitleText>
        <PromptText padded>{confirmationPromptText}</PromptText>
        <TextInput
          autoFocus
          label="Verification Code"
          type="numeric"
          autoComplete="password"
          returnKeyType="next"
          enzblesReturnKeyAutomatically
          error={touched.code && errors.code}
          onChangeText={(text) => setFieldValue('code', text)}
          value={values.code}
        />
      </PaddedView>
    </ScrollView>
    <NextButtonRow>
      <View />
      <NextButton
        onPress={handleSubmit}
        disabled={isSubmitting || !isValid}
        loading={isSubmitting}
      />
    </NextButtonRow>
  </SafeAreaView>
);

Verification.propTypes = {
  brand: PropTypes.node,
  confirmationTitleText: PropTypes.string,
  confirmationPromptText: PropTypes.string,
  onFinishAuth: PropTypes.func,
  screenProps: PropTypes.shape({}), // we'll funnel screenProps into props
};

Verification.defaultProps = {
  brand: <BrandIcon />,
  confirmationTitleText: 'Thanks!\nStand by…',
  confirmationPromptText:
    'We just sent you a code. Enter it below when it comes.',
};

export default Verification;
