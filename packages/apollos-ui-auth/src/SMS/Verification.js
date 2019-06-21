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
  disabled,
  errors,
  isLoading,
  onPressNext,
  setFieldValue,
  touched,
  values,
}) => (
  <SafeAreaView style={StyleSheet.absoluteFill}>
    <ScrollView>
      <PaddedView>
        <BrandIcon />
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
        onPress={onPressNext}
        disabled={disabled}
        loading={isLoading}
      />
    </NextButtonRow>
  </SafeAreaView>
);

Verification.propTypes = {
  confirmationTitleText: PropTypes.string,
  confirmationPromptText: PropTypes.string,
  disabled: PropTypes.bool,
  errors: PropTypes.shape({
    code: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  onFinishAuth: PropTypes.func,
  onPressNext: PropTypes.func,
  setFieldValue: PropTypes.func.isRequired,
  touched: PropTypes.shape({
    code: PropTypes.string,
  }),
  values: PropTypes.shape({
    code: PropTypes.string,
  }),
};

Verification.defaultProps = {
  confirmationTitleText: 'Thanks!\nStand by…',
  confirmationPromptText:
    'We just sent you a code. Enter it below when it comes.',
};

export default Verification;
