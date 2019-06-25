import React, { PureComponent } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

// import { track, events } from 'apolloschurchapp/src/analytics';
import { PaddedView, TextInput, ButtonLink } from '@apollosproject/ui-kit';

import { FlexedSafeAreaView, NextButton } from '../styles';

class PasswordLogin extends PureComponent {
  static propTypes = {
    setFieldValue: PropTypes.func,
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
    values: PropTypes.shape({}),
    handleSubmit: PropTypes.func,
    isSubmitting: PropTypes.bool,
    isValid: PropTypes.bool,
    handleForgotPassword: PropTypes.func,
  };

  render() {
    const {
      values,
      touched,
      errors,
      handleSubmit,
      setFieldValue,
      isValid,
      isSubmitting,
    } = this.props;
    return (
      <FlexedSafeAreaView>
        <PaddedView>
          <View>
            <TextInput
              label="Email"
              type="email"
              value={values.email}
              error={touched.email && errors.email}
              onChangeText={(text) => setFieldValue('email', text)}
              onSubmitEditing={() => this.passwordInput.focus()}
              returnKeyType="next"
              textContentType="username"
              enablesReturnKeyAutomatically
            />
            <TextInput
              label="Password"
              type="password"
              value={values.password}
              error={touched.password && errors.password}
              onChangeText={(text) => setFieldValue('password', text)}
              onSubmitEditing={handleSubmit}
              returnKeyType="go"
              textContentType="password"
              enablesReturnKeyAutomatically
              inputRef={(r) => {
                this.passwordInput = r;
              }}
            />
            {this.props.handleForgotPassword ? (
              <ButtonLink onPress={this.props.handleForgotPassword}>
                Forgot your password?
              </ButtonLink>
            ) : null}
          </View>
        </PaddedView>
        <PaddedView>
          <NextButton
            onPress={handleSubmit}
            title={'Sign in'}
            disabled={!isValid}
            pill={false}
            loading={isSubmitting}
          />
        </PaddedView>
      </FlexedSafeAreaView>
    );
  }
}

export default PasswordLogin;
