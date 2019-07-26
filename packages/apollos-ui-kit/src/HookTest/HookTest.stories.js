import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';

import FlexedView from '../FlexedView';

import HookTest from '.';

/* eslint-disable react-native/no-inline-styles */
storiesOf('ui-kit/HookTest', module).add('default', () => (
  <FlexedView style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
    <HookTest />
  </FlexedView>
));
