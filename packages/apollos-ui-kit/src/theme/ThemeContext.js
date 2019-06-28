import React, { PureComponent, Children, createContext } from 'react';

import PropTypes from 'prop-types';

import createTheme, { THEME_PROPS } from './createTheme';

const ThemeContext = createContext({
  theme: createTheme({}),
  themeInput: {},
  iconInput: {},
});

class Provider extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    themeInput: PropTypes.shape(THEME_PROPS),
    iconInput: PropTypes.shape({}),
    value: PropTypes.shape({}),
  };

  static defaultProps = {
    children: null,
    themeInput: {},
    iconInput: {},
    value: null,
  };

  render() {
    const { themeInput, iconInput, children, value } = this.props;
    let themeValue = value;

    if (!themeValue) {
      const theme = createTheme(themeInput);
      themeValue = { theme, iconInput, themeInput };
    }

    return (
      <ThemeContext.Provider value={themeValue}>
        {Children.only(children)}
      </ThemeContext.Provider>
    );
  }
}

const { Consumer } = ThemeContext;

const Context = { ...ThemeContext, Provider, Consumer };

export { Provider, Consumer, Context };
