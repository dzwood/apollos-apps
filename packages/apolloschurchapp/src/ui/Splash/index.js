import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import {
  styled,
  withTheme,
  ThemeMixin,
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

const BrandIcon = withTheme(({ theme }) => ({
  name: 'brand-icon',
  size: theme.sizing.baseUnit * 3.0,
  style: {
    marginBottom: theme.sizing.baseUnit,
  },
}))(Icon);

const Title = styled(({ theme }) => ({
  marginBottom: theme.sizing.baseUnit * 2,
}))(H1);

const CoverImage = styled({
  resizeMode: 'cover',
  position: 'absolute',
})(Image);

// TODO: react-navigation does not like `memo` ... doesn't see it as a react component
const Splash = ({ slideTitle, description, imgSrc, isLight, ...props }) => (
  <ThemeMixin mixin={{ type: isLight ? 'light' : 'dark' }}>
    <BackgroundView>
      <Slide {...props}>
        {imgSrc ? <CoverImage source={imgSrc} /> : null}
        <Content>
          <BrandIcon />
          <Title>{slideTitle}</Title>
          <H4>{description}</H4>
        </Content>
      </Slide>
    </BackgroundView>
  </ThemeMixin>
);

Splash.propTypes = {
  /* The `Swiper` component used in `<onBoarding>` looks for and hijacks the title prop of it's
   * children. Thus we have to use more unique name.
   */
  slideTitle: PropTypes.string,
  description: PropTypes.string,
  imgSrc: PropTypes.string,
  isLight: PropTypes.bool,
};

Splash.defaultProps = {
  slideTitle: "We're glad you're here.".toUpperCase(),
  description:
    "We're not just a building you go to, but a family to belong to.",
  isLight: false,
};

Splash.navigationOptions = {
  header: null,
};

export default Splash;
