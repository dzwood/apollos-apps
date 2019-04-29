import React from 'react';
import { View } from 'react-native';
import {
  styled,
  withTheme,
  Icon,
  H2,
  H5,
  withIsLoading,
  PaddedView,
} from '@apollosproject/ui-kit';
import PropTypes from 'prop-types';

const IconWrapper = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit,
}))(View);

const BrandIcon = withTheme(({ theme, icon }) => ({
  name: typeof icon === 'string' ? icon : 'brand-icon',
  fill: theme.colors.primary,
  size: theme.sizing.baseUnit * 3,
}))(Icon);

const TitleWrapper = styled(({ theme }) => ({
  paddingBottom: theme.sizing.baseUnit * 0.5,
}))(View);

const Title = styled(({ theme }) => ({
  color: theme.colors.primary,
}))(H2);

const StyledH5 = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
}))(H5);

const SlideContent = withIsLoading(
  ({ icon, title, description, children, isLoading, ...props }) => {
    if (!icon && !title && !description && !children) {
      console.warn(
        `Warning: You need to pass at least one prop for SlideContent to render something cowboy.`
      );
    }

    return (
      <PaddedView {...props}>
        <IconWrapper>
          {icon ? <BrandIcon icon={icon} isLoading={isLoading} /> : null}
        </IconWrapper>
        <TitleWrapper>
          <Title>{title}</Title>
        </TitleWrapper>
        <StyledH5>{description}</StyledH5>
        {children}
      </PaddedView>
    );
  }
);

SlideContent.displayName = 'SlideContent';

SlideContent.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.bool, // Use default `brand-icon`
    PropTypes.string, // Use a custom icon name
  ]),
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default SlideContent;
