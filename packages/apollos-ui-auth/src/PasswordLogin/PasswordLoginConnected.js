import React from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import { Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import HANDLE_LOGIN from '../handleLogin';

import AUTHENTICATE from './authenticate';
import PasswordLogin from './PasswordLogin';

const PasswordLoginConnected = ({ onLogin }) => (
  <ApolloConsumer>
    {(client) => (
      <Mutation
        mutation={AUTHENTICATE}
        update={(cache, { data: { authenticate } }) => {
          client.mutate({
            mutation: HANDLE_LOGIN,
            variables: {
              authToken: authenticate.token,
            },
          });
        }}
      >
        {(authenticate) => (
          <Formik
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Invalid email address')
                .required('Email is required!'),
              password: Yup.string().required('Password is required!'),
            })}
            onSubmit={async (variables, { setSubmitting, setFieldError }) => {
              try {
                await authenticate({ variables });
                if (onLogin) onLogin();
              } catch (e) {
                const { graphQLErrors } = e;
                if (
                  graphQLErrors.length &&
                  graphQLErrors.find(
                    ({ extensions }) => extensions.code === 'UNAUTHENTICATED'
                  )
                ) {
                  setFieldError('email', true);
                  setFieldError(
                    'password',
                    'Your email or password is incorrect.'
                  );
                } else {
                  setFieldError(
                    'password',
                    'Unknown error. Please try again later.'
                  );
                }
              }
              setSubmitting(false);
            }}
          >
            {(formikBag) => <PasswordLogin {...formikBag} />}
          </Formik>
        )}
      </Mutation>
    )}
  </ApolloConsumer>
);

PasswordLoginConnected.propTypes = {
  onLogin: PropTypes.func,
};

export default PasswordLoginConnected;
