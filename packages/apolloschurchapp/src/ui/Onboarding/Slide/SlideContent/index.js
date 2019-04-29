import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  withTheme,
  Icon,
  styled,
  H2,
  H5,
  PaddedView,
} from '@apollosproject/ui-kit';

const BrandIcon = withTheme(({ theme, icon }) => ({
  name: typeof icon === 'string' ? icon : 'brand-icon',
  fill: theme.colors.primary,
  size: theme.sizing.baseUnit * 3,
  style: {
    marginBottom: theme.sizing.baseUnit,
  },
}))(Icon);

const Title = styled(({ theme }) => ({
  color: theme.colors.primary,
  marginBottom: theme.sizing.baseUnit * 0.5,
}))(H2);

const StyledH5 = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
}))(H5);

const SlideContent = memo(
  ({ icon, title, description, children, ...props }) => {
    if (!icon && !title && !description && !children) {
      console.warn(
        `Warning: You need to pass at least one prop for SlideContent to render something cowboy.`
      );
    }

    return (
      <PaddedView {...props}>
        {icon ? <BrandIcon icon={icon} /> : null}
        <Title>{title}</Title>
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
