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
  it('should render with a custom authTitleText', () => {
    const tree = renderer.create(
      <Providers>
        <PhoneEntry setFieldValue={jest.fn()} authTitleText={'Custom Title'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as disabled', () => {
    const tree = renderer.create(
      <Providers>
        <PhoneEntry setFieldValue={jest.fn()} disabled />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
