import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import {
  styled,
  withTheme,
  Icon,
  H1,
  H4,
  PaddedView,
  BackgroundView,
} from '@apollosproject/ui-kit';

import Slide from '../Onboarding/Slide';

const Content = styled({
  flex: 1,
  justifyContent: 'center',
})(PaddedView);

const BrandIcon = withTheme(({ theme, color }) => ({
  name: 'brand-icon',
  size: theme.sizing.baseUnit * 3,
  ...(color ? { fill: color } : {}),
  style: {
    marginBottom: theme.sizing.baseUnit,
  },
}))(Icon);

const Title = styled(({ theme, color }) => ({
  marginBottom: theme.sizing.baseUnit * 2,
  ...(color ? { color } : {}),
}))(H1);

const StyledH4 = styled(({ color }) => ({
  ...(color ? { color } : {}),
}))(H4);

const CoverImage = styled({
  resizeMode: 'cover',
  position: 'absolute',
})(Image);

const Splash = ({ slideTitle, description, textColor, imgSrc, ...props }) => (
  <BackgroundView>
    <Slide {...props}>
      {imgSrc ? <CoverImage source={imgSrc} /> : null}
      <Content>
        <BrandIcon color={textColor} />
        <Title color={textColor}>{slideTitle}</Title>
        <StyledH4 color={textColor}>{description}</StyledH4>
      </Content>
    </Slide>
  </BackgroundView>
);

Splash.propTypes = {
  /* The `Swiper` component used in `<onBoarding>` looks for and hijacks the title prop of it's
   * children. Thus we have to use more unique name.
   */
  slideTitle: PropTypes.string,
  description: PropTypes.string,
  imgSrc: PropTypes.string,
  textColor: PropTypes.string, // Use for custom text and `BrandIcon` color when overlaying text on an image or video needs more clarity. Defaults to theme driven colors.
};

Splash.defaultProps = {
  slideTitle: "We're glad you're here.".toUpperCase(),
  description:
    "We're not just a building you go to, but a family to belong to.",
};

Splash.navigationOptions = {
  header: null,
};

export default Splash;
