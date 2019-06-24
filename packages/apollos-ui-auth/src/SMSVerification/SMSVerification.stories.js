import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';

import SMSVerification from './SMSVerification';

storiesOf('ui-auth/SMSVerification', module)
  .add('default', () => <SMSVerification setFieldValue={() => {}} />)
  .add('confirmationTitleText', () => (
    <SMSVerification
      setFieldValue={() => {}}
      confirmationTitleText={'A Custom Title'}
    />
  ))
  .add('confirmationPromptText', () => (
    <SMSVerification
      setFieldValue={() => {}}
      confirmationPromptText={'Boom custom prompty text boom'}
    />
  ))
  .add('disabled', () => (
    <SMSVerification setFieldValue={() => {}} onPressNext={() => {}} disabled />
  ))
  .add('errors', () => (
    <SMSVerification
      setFieldValue={() => {}}
      errors={{ code: 'Boom errors.code Boom' }}
    />
  ))
  .add('isLoading', () => (
    <SMSVerification
      setFieldValue={() => {}}
      onPressNext={() => {}}
      isLoading
    />
  ))
  .add('onPressNext', () => (
    <SMSVerification setFieldValue={() => {}} onPressNext={() => {}} />
  ))
  .add('values', () => (
    <SMSVerification
      setFieldValue={() => {}}
      values={{ code: 'Boom values.code boom' }}
    />
  ));
