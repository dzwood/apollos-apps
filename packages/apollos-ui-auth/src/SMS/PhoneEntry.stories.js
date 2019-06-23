import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';

import PhoneEntry from './PhoneEntry';

storiesOf('ui-auth/SMS/PhoneEntry', module)
  .add('default', () => <PhoneEntry setFieldValue={() => {}} />)
  .add('alternateLoginText', () => (
    <PhoneEntry
      setFieldValue={() => {}}
      onPressAlternateLogin={() => {}}
      alternateLoginText={
        'Custom Text to direct people to an alternate login flow'
      }
    />
  ))
  .add('authTitleText', () => (
    <PhoneEntry setFieldValue={() => {}} authTitleText={'Custom Title'} />
  ))
  .add('disabled', () => <PhoneEntry setFieldValue={() => {}} disabled />)
  .add('errors', () => (
    <PhoneEntry
      setFieldValue={() => {}}
      errors={{ phone: 'Boom Error Boom' }}
    />
  ))
  .add('isLoading', () => (
    <PhoneEntry setFieldValue={() => {}} onPressNext={() => {}} isLoading />
  ))
  .add('onPressAlternateLogin', () => (
    <PhoneEntry setFieldValue={() => {}} onPressAlternateLogin={() => {}} />
  ))
  .add('onPressNext', () => (
    <PhoneEntry setFieldValue={() => {}} onPressNext={() => {}} />
  ));
