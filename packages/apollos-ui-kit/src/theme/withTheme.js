import React from 'react';

import { Consumer } from './ThemeContext';

const DEFAULT_MAPPER_FN = ({ theme } = {}) => ({ theme });

const withTheme = (mapperFn = DEFAULT_MAPPER_FN) => (ComponentToWrap) => (
  props
) => (
  <Consumer>
    {({ theme }) => {
      const mappedTheme = mapperFn({ theme, ...props });
      return <ComponentToWrap {...props} {...mappedTheme} />;
    }}
  </Consumer>
);

export default withTheme;
