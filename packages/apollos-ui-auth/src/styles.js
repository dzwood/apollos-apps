import React from 'react';
import { SafeAreaView } from 'react-navigation';
import { compose, withProps } from 'recompose';
import {
  Button,
  withTheme,
  Icon,
  styled,
  H2,
  H5,
} from '@apollosproject/ui-kit';

export const FlexedSafeAreaView = compose(
  styled({ flex: 1 }, 'ui-auth.FlexedSafeAreaView'),
  withProps({ forceInset: { top: 'always' } })
)(SafeAreaView);

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

export const NextButton = styled({}, 'ui-auth.NextButton')((props) => (
  <Button type={'primary'} pill={false} {...props} />
));
