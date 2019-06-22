import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';

import PhoneEntry from './PhoneEntry';

storiesOf('ui-auth/SMS/PhoneEntry', module).add('default', () => (
  <PhoneEntry setFieldValue={() => {}} />
));
