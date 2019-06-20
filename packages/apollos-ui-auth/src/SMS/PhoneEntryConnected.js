/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { BackgroundView } from '@apollosproject/ui-kit';

import PhoneEntry from './PhoneEntry';

const requestPin = gql`
  mutation requestPin($phone: String!) {
    requestSmsLoginPin(phoneNumber: $phone) {
      success
    }
  }
`;

class PhoneEntryConnected extends Component {
  static propTypes = {
    screenProps: PropTypes.shape({}), // we'll funnel screenProps into props
  };

  static defaultProps = {
    screenProps: {},
  };

  validationSchema = Yup.object().shape({
    phone: Yup.string().matches(
      /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/,
      'Your phone number appears to be invalid'
    ),
  });

  flatProps = { ...this.props, ...this.props.screenProps };

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

  handleOnPressAlternateLogin = () => {
    this.props.navigation.navigate('AuthPassword');
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={StyleSheet.absoluteFill}
        behavior={'padding'}
      >
        <BackgroundView>
          <Mutation mutation={requestPin}>
            {(mutate) => (
              <Formik
                initialValues={{ phone: '' }}
                validationSchema={this.validationSchema}
                onSubmit={this.handleOnSubmit(mutate)}
              >
                {({
                  setFieldValue,
                  handleSubmit,
                  values,
                  isSubmitting,
                  isValid,
                  touched,
                  errors,
                }) => (
                  <PhoneEntry
                    values={values}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    errors={errors}
                    onPressNext={handleSubmit}
                    onPressAlternateLogin={this.handleOnPressAlternateLogin}
                    disabled={isSubmitting || !isValid}
                    isLoading={isSubmitting}
                    {...this.flatProps}
                  />
                )}
              </Formik>
            )}
          </Mutation>
        </BackgroundView>
      </KeyboardAvoidingView>
    );
  }
}

export default PhoneEntryConnected;
