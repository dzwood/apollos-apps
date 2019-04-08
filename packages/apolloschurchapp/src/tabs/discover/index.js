import { createStackNavigator } from 'react-navigation';

import ContentFeed from '@apollosproject/ui-content';

import tabBarIcon from '../tabBarIcon';

import Discover from './Discover';

export const DiscoverNavigator = createStackNavigator(
  {
    Discover,
    ContentFeed,
  },
  {
    initialRouteName: 'Discover',
  }
);

DiscoverNavigator.navigationOptions = {
  tabBarIcon: tabBarIcon('sections'),
};

export default DiscoverNavigator;
