/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
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
  // width: '70%',
  color: theme.colors.text.tertiary,
}))(H6);

class PhoneEntry extends Component {
  static propTypes = {
    values: PropTypes.shape({
      phone: PropTypes.string,
    }),
    touched: PropTypes.shape({
      phone: PropTypes.string,
    }),
    errors: PropTypes.shape({
      phone: PropTypes.string,
    }),
    setFieldValue: PropTypes.func.isRequired,
    onPressNext: PropTypes.func,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    screenProps: PropTypes.shape({}), // we'll funnel screenProps into props
    authTitleText: PropTypes.string,
    smsPromptText: PropTypes.string,
    smsPolicyInfo: PropTypes.node,
    allowPassword: PropTypes.bool,
    smsPasswordLoginPrompt: PropTypes.node,
  };

  static defaultProps = {
    authTitleText: 'Have we met before?',
    smsPromptText:
      "Let's get you signed in using your mobile number. We'll text you a code to make login super easy!",
    smsPolicyInfo: (
      <LegalText>
        {"We'll never share your information or contact you (unless you ask!)."}
      </LegalText>
    ),
    allowPassword: true,
    smsPasswordLoginPrompt: "I'd rather use my email and a password",
  };

  get flatProps() {
    return { ...this.props, ...(this.props.screenProps || {}) };
  }

  handleOnSubmit = (mutate) => async (
    { phone },
    { setSubmitting, setFieldError }
  ) => {
    setSubmitting(true);
    try {
      await mutate({ variables: { phone } });
      this.props.navigation.navigate('AuthSMSVerification', { phone });
    } catch (e) {
      setFieldError(
        'phone',
        'There was an error. Please double check your number and try again.'
      );
    }
    setSubmitting(false);
  };

  handlePasswordLoginPress = () => {
    this.props.navigation.navigate('AuthPassword');
  };

  render() {
    const {
      authTitleText,
      smsPolicyInfo,
      allowPassword,
      smsPasswordLoginPrompt,
    } = this.flatProps;

    return (
      <FlexedSafeAreaView forceInset={forceInset}>
        <ScrollView>
          <PaddedView>
            <BrandIcon />
            <TitleText>{authTitleText}</TitleText>
            <PromptText padded>{this.props.smsPromptText}</PromptText>

            <TextInput
              autoFocus
              autoComplete="tel"
              label="Mobile Number"
              type="phone"
              returnKeyType="next"
              onSubmitEditing={this.props.onPressNext}
              enzblesReturnKeyAutomatically
              error={this.props.touched.phone && this.props.errors.phone}
              onChangeText={(text) => this.props.setFieldValue('phone', text)}
              value={this.props.values.phone}
            />
            {smsPolicyInfo}
          </PaddedView>
          {allowPassword ? (
            <PaddedView>
              <ButtonLink onPress={this.handlePasswordLoginPress}>
                {smsPasswordLoginPrompt}
              </ButtonLink>
            </PaddedView>
          ) : null}
        </ScrollView>

        <PaddedView>
          <NextButton
            onPress={this.props.onPressNext}
            disabled={this.props.disabled}
            loading={this.props.isLoading}
          />
        </PaddedView>
      </FlexedSafeAreaView>
    );
  }
}

export default PhoneEntry;
