/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  styled,
  H6,
  PaddedView,
  TextInput,
  ButtonLink,
} from '@apollosproject/ui-kit';

import { NextButton, TitleText, PromptText, BrandIcon } from '../styles';

const FlexedSafeAreaView = styled({
  flex: 1,
})(SafeAreaView);
const forceInset = { top: 'always' };

const LegalText = styled(({ theme }) => ({
  color: theme.colors.text.tertiary,
}))(H6);

const PhoneEntry = ({
  alternateLoginText,
  authTitleText,
  disabled,
  errors,
  isLoading,
  onPressAlternateLogin,
  onPressNext,
  setFieldValue,
  smsPolicyInfo,
  smsPromptText,
  touched,
  values,
}) => (
  <FlexedSafeAreaView forceInset={forceInset}>
    <ScrollView>
      <PaddedView>
        <BrandIcon />
        <TitleText>{authTitleText}</TitleText>
        <PromptText padded>{smsPromptText}</PromptText>

        <TextInput
          autoFocus
          autoComplete={'tel'}
          label={'Mobile Number'}
          type={'phone'}
          returnKeyType={'next'}
          onSubmitEditing={onPressNext}
          enablesReturnKeyAutomatically
          error={touched.phone && errors.phone}
          onChangeText={(text) => setFieldValue('phone', text)}
          value={values.phone}
        />
        {smsPolicyInfo}
      </PaddedView>
      {onPressAlternateLogin ? (
        <PaddedView>
          <ButtonLink onPress={onPressAlternateLogin}>
            {alternateLoginText}
          </ButtonLink>
        </PaddedView>
      ) : null}
    </ScrollView>

    <PaddedView>
      <NextButton
        onPress={onPressNext}
        disabled={disabled}
        loading={isLoading}
      />
    </PaddedView>
  </FlexedSafeAreaView>
);

PhoneEntry.propTypes = {
  allowPassword: PropTypes.bool,
  alternateLoginText: PropTypes.node,
  authTitleText: PropTypes.string,
  disabled: PropTypes.bool,
  errors: PropTypes.shape({
    phone: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  onPressAlternateLogin: PropTypes.func,
  onPressNext: PropTypes.func,
  setFieldValue: PropTypes.func.isRequired,
  smsPolicyInfo: PropTypes.node,
  smsPromptText: PropTypes.string,
  touched: PropTypes.shape({
    phone: PropTypes.bool,
  }),
  values: PropTypes.shape({
    phone: PropTypes.string,
  }),
};

PhoneEntry.defaultProps = {
  authTitleText: 'Have we met before?',
  alternateLoginText: "I'd rather use my email and a password",
  smsPolicyInfo: (
    <LegalText>
      {"We'll never share your information or contact you (unless you ask!)."}
    </LegalText>
  ),
  smsPromptText:
    "Let's get you signed in using your mobile number. We'll text you a code to make login super easy!",
};

PhoneEntry.displayName = 'PhoneEntry';

export default PhoneEntry;
