import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';
import { H6 } from '@apollosproject/ui-kit';

import SMSPhoneEntry from './SMSPhoneEntry';

storiesOf('ui-auth/SMSPhoneEntry', module)
  .add('default', () => <SMSPhoneEntry setFieldValue={() => {}} />)
  .add('alternateLoginText', () => (
    <SMSPhoneEntry
      setFieldValue={() => {}}
      onPressAlternateLogin={() => {}}
      alternateLoginText={
        'Custom Text to direct people to an alternate login flow'
      }
    />
  ))
  .add('authTitleText', () => (
    <SMSPhoneEntry setFieldValue={() => {}} authTitleText={'Custom Title'} />
  ))
  .add('disabled', () => (
    <SMSPhoneEntry setFieldValue={() => {}} onPressNext={() => {}} disabled />
  ))
  .add('errors', () => (
    <SMSPhoneEntry
      setFieldValue={() => {}}
      errors={{ phone: 'Boom errors.phone Boom' }}
    />
  ))
  .add('isLoading', () => (
    <SMSPhoneEntry setFieldValue={() => {}} onPressNext={() => {}} isLoading />
  ))
  .add('onPressAlternateLogin', () => (
    <SMSPhoneEntry setFieldValue={() => {}} onPressAlternateLogin={() => {}} />
  ))
  .add('onPressNext', () => (
    <SMSPhoneEntry setFieldValue={() => {}} onPressNext={() => {}} />
  ))
  .add('smsPolicyInfo', () => (
    <SMSPhoneEntry
      setFieldValue={() => {}}
      smsPolicyInfo={
        <H6 style={{ color: 'salmon' }}>Boom custom legalese boom</H6> // eslint-disable-line react-native/no-inline-styles, react-native/no-color-literals
      }
    />
  ))
  .add('smsPromptText', () => (
    <SMSPhoneEntry
      setFieldValue={() => {}}
      smsPromptText={'Boom custom prompty text boom'}
    />
  ))
  .add('values', () => (
    <SMSPhoneEntry
      setFieldValue={() => {}}
      values={{ phone: 'Boom values.phone boom' }}
    />
  ));
