import analytics from '@metarouter/analytics-react-native';
import { isEqual } from 'lodash';

function getActiveRouteName(navigationState, routeNames = []) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  const nextRouteNames = [...routeNames, route.routeName];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route, nextRouteNames);
  }
  return { routeName: nextRouteNames.join(' > '), params: route.params };
}

const onNavigationStateChange = (prevState, currentState) => {
  const { routeName: currentScreen, params: currentParams } = getActiveRouteName(currentState);
  const { routeName: prevScreen, params: prevParams } = getActiveRouteName(prevState);

  if (prevScreen !== currentScreen || !isEqual(currentParams, prevParams)) {
    analytics.track(`Viewed Screen ${currentScreen}`);
    analytics.screen(currentScreen);
  }
};

analytics.setup('a27aHBJqZgkDDfvZ4Q3Zr', {
  // Record screen views automatically!
  recordScreenViews: false,
  // Record certain application events automatically!
  trackAppLifecycleEvents: true,
});

const CoreAnalytics = ({ children }) => children({ onNavigationStateChange });

export default CoreNavigationAnalytics;
