import React from 'react';
import { Providers, renderWithApolloData } from '../../utils/testUtils';

import UserAvatarUpdate from './UserAvatarUpdate';

describe('UserAvatarUpdate component', () => {
  it('should render', async () => {
    const tree = await renderWithApolloData(
      <Providers>
        <UserAvatarUpdate />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render medium sized icon', async () => {
    const tree = await renderWithApolloData(
      <Providers>
        <UserAvatarUpdate size={'medium'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render custom button icon', async () => {
    const tree = await renderWithApolloData(
      <Providers>
        <UserAvatarUpdate buttonIcon={'settings'} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
