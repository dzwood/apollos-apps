import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';

import PasswordLogin from './PasswordLogin';

storiesOf('ui-auth', module).add('LoginForm', () => (
  <PasswordLogin
    values={{ email: '', password: '' }}
    touched={{ email: false, password: false }}
    errors={{ email: null, password: null }}
  />
));
