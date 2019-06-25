import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';

import PasswordSignup from './PasswordSignup';

storiesOf('ui-auth/PasswordSignup', module).add('PasswordSignup', () => (
  <PasswordSignup
    values={{ email: '', password: '' }}
    touched={{ email: false, password: false }}
    errors={{ email: null, password: null }}
  />
));
