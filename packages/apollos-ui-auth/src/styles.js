import React from 'react';
import {
  Button,
  withTheme,
  Icon,
  styled,
  H2,
  H5,
} from '@apollosproject/ui-kit';

export const BrandIcon = withTheme(({ theme }) => ({
  name: 'brand-icon',
  size: theme.sizing.baseUnit * 3.0,
  fill: theme.colors.primary,
  marginBottom: theme.sizing.baseUnit,
}))(Icon);

export const TitleText = styled(({ theme }) => ({
  color: theme.colors.primary,
}))(H2);

export const PromptText = styled(({ theme }) => ({
  color: theme.colors.text.secondary,
}))(H5);

export const NextButton = (props) => (
  <Button type={'primary'} pill={false} {...props}>
    <H5>Next</H5>
  </Button>
);
