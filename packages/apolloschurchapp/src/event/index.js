import { createStackNavigator } from 'react-navigation';

import Event from './Event';

const EventNavigator = createStackNavigator(
  {
    Event,
  },
  {
    initialRouteName: 'Event',
    headerMode: 'float',
    headerTransitionPreset: 'fade-in-place',
    navigationOptions: { header: null },
  }
);

export default EventNavigator;
