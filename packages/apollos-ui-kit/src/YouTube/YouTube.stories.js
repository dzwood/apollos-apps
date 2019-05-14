import React from 'react';
import { storiesOf } from '@apollosproject/ui-storybook';

import YouTube from '.';

storiesOf('ui-kit/YouTube', module).add('example', () => (
  <YouTube source={'https://www.youtube.com/embed/48VQrC06m-Y'} />
));
