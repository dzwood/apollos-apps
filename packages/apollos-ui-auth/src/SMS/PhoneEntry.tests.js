import React from 'react';
import renderer from 'react-test-renderer';

import { Providers } from '../testUtils';

import PhoneEntry from './PhoneEntry';

describe('The Auth PhoneEntry component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <PhoneEntry setFieldValue={jest.fn()} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
