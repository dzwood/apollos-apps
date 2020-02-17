import analytics from '@metarouter/analytics-react-native';
import { isEqual, last } from 'lodash';

function getActiveRouteName(navigationState, routeNames = []) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route, [...routeNames, route.routeName]);
  }

  // Handles routes like ContentItem -> ContentItem (the ContentItem route in the ContentItem navigator)
  if (last(routeNames) === route.routeName) {
    return { routeName: routeNames.join(' > '), params: route.params };
  }
  // Handles all other routes.
  return {
    routeName: [...routeNames, route.routeName].join(' > '),
    params: route.params,
  };
}

const onNavigationStateChange = (prevState, currentState) => {
  const {
    routeName: currentScreen,
    params: currentParams,
  } = getActiveRouteName(currentState);
  const { routeName: prevScreen, params: prevParams } = getActiveRouteName(
    prevState
  );

  if (prevScreen !== currentScreen || !isEqual(currentParams, prevParams)) {
    analytics.track(`Viewed Screen ${currentScreen}`);
    // Not tracking for now.
    // analytics.screen(currentScreen);
  }
};

analytics.setup('a27aHBJqZgkDDfvZ4Q3Zr', {
  // Record screen views automatically!
  recordScreenViews: false,
  // Record certain application events automatically!
  trackAppLifecycleEvents: true,
});

const CoreNavigationAnalytics = ({ children }) =>
  children({ onNavigationStateChange });

export default CoreNavigationAnalytics;
