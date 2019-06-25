import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '../../Providers';

import Notifications from './Notifications';

describe('The Notifications toggle switch', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <Providers>
        <Notifications />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
