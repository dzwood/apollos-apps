/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { BackgroundView } from '@apollosproject/ui-kit';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ApolloConsumer, Mutation } from 'react-apollo';

import handleLogin from '../handleLogin';
import { AuthConsumer } from '../Provider';

import Verification from './Verification';
import VERIFY_PIN from './verifyPin';

class VerificationConnected extends Component {
  static propTypes = {
    brand: PropTypes.node,
    confirmationTitleText: PropTypes.string,
    confirmationPromptText: PropTypes.string,
    onFinishAuth: PropTypes.func,
    screenProps: PropTypes.shape({}), // we'll funnel screenProps into props
  };

  static defaultProps = {
    screenProps: {},
  };

  validationSchema = Yup.object().shape({
    phone: Yup.string().matches(/^[6-9]\d{9}$/),
  });

  flatProps = { ...this.props, ...this.props.screenProps };

  handleOnSubmit = ({ verifyPin, closeAuth }) => async (
    { code },
    { setSubmitting, setFieldError }
  ) => {
    setSubmitting(true);
    try {
      await verifyPin({
        variables: { code, phone: this.props.navigation.state.params.phone },
      });
      closeAuth();
    } catch (e) {
      setFieldError(
        'code',
        'There was an error. Please double check your number and try again.'
      );
    }
    setSubmitting(false);
  };

  render() {
    return (
      <KeyboardAvoidingView style={StyleSheet.absoluteFill} behavior="padding">
        <BackgroundView>
          <AuthConsumer>
            {({ closeAuth }) => (
              <ApolloConsumer>
                {(client) => (
                  <Mutation
                    mutation={VERIFY_PIN}
                    update={(cache, { data: { authenticateWithSms } }) => {
                      client.mutate({
                        mutation: handleLogin,
                        variables: {
                          authToken: authenticateWithSms.token,
                        },
                      });
                    }}
                  >
                    {(verifyPin) => (
                      <Formik
                        initialValues={{ code: '' }}
                        validationSchema={this.validationSchema}
                        onSubmit={this.handleOnSubmit({ verifyPin, closeAuth })}
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
                          <Verification
                            errors={errors}
                            handleSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                            isValid={isValid}
                            setFieldValue={setFieldValue}
                            touched={touched}
                            values={values}
                            {...this.flatProps}
                          />
                        )}
                      </Formik>
                    )}
                  </Mutation>
                )}
              </ApolloConsumer>
            )}
          </AuthConsumer>
        </BackgroundView>
      </KeyboardAvoidingView>
    );
  }
}

export default VerificationConnected;
