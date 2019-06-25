import { TabBar } from 'react-native-tab-view';
import { compose, withProps } from 'recompose';

import styled from '../../styled';
import { withTheme } from '../../theme';

import Label from './Label';
import Indicator from './Indicator';

const withStyles = compose(
  styled({ backgroundColor: 'transparent' }, 'ui-kit.TabView.TabBar'),
  withTheme(({ theme, indicatorColor }) => ({
    indicatorColor: indicatorColor || theme.colors.tertiary,
  }))
);

export default compose(
  withStyles,
  withProps({
    renderLabel: Label,
    renderIndicator: Indicator,
  })
)(TabBar);
