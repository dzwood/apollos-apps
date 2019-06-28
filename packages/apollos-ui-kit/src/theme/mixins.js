import React from 'react';
import { merge } from 'lodash';

import createTheme from './createTheme';
import { Consumer, Provider } from './ThemeContext';

const getNewTheme = ({ theme, themeInput, inheritedThemeInput, props }) => {
  let themeInputAsObject = themeInput;
  if (typeof themeInput === 'function') {
    themeInputAsObject = themeInput({ ...props, theme });
  }
  themeInputAsObject = merge({}, inheritedThemeInput, themeInputAsObject);

  const themeWithMixin = createTheme(themeInputAsObject);

  return {
    theme: themeWithMixin,
    themeInput: themeInputAsObject,
  };
};

const withThemeMixin = (themeInput) => (ComponentToWrap) => (props) => (
  <Consumer>
    {({ theme, themeInput: inheritedThemeInput }) => {
      const newTheme = getNewTheme({
        theme,
        themeInput,
        inheritedThemeInput,
        props,
      });
      return (
        <Provider value={{ ...theme, ...newTheme }}>
          <ComponentToWrap {...props} />
        </Provider>
      );
    }}
  </Consumer>
);

const ThemeMixin = withThemeMixin(({ mixin = {} } = {}) => mixin)(
  ({ children }) => children
);

export { withThemeMixin, ThemeMixin };
