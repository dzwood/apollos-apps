import analytics from '@metarouter/analytics-react-native';

function getActiveRouteName(navigationState, routeNames = []) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  const nextRouteNames = routeNames.push(route.routeName);
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route, nextRouteNames);
  }
  return nextRouteNames.join(' > ');
}

const onNavigationStateChange = (prevState, currentState) => {
  const currentScreen = getActiveRouteName(currentState);
  const prevScreen = getActiveRouteName(prevState);

  if (prevScreen !== currentScreen) {
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

export default CoreAnalytics;
