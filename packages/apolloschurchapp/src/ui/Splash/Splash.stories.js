import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { GradientOverlayImage } from '@apollosproject/ui-kit';

import Splash from '.';

storiesOf('Splash', module)
  .add('default', () => <Splash />)
  .add('slideTitle', () => <Splash slideTitle={'Custom title text'} />)
  .add('description', () => <Splash description={'Custom description text'} />)
  .add('textColor', () => <Splash textColor={'salmon'} />)
  .add('ImageComponent', () => (
    <Splash
      BackgroundComponent={
        <GradientOverlayImage
          source={'https://picsum.photos/375/812/?random'}
        />
      }
    />
  ))
  .add('Slide props', () => <Splash onPressPrimary={() => {}} />);
