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
  .add('error', () => (
    <PhoneEntry setFieldValue={() => {}} error={'Boom Error Boom'} />
  ))
  .add('isLoading', () => <PhoneEntry setFieldValue={() => {}} isLoading />);
