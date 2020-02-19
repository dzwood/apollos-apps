import React from 'react';
import { Providers, renderWithApolloData } from '../../utils/testUtils';

import PlayButtonConnected from './PlayButtonConnected';

describe('PlayButtonConnected component', () => {
  it('renders PlayButtonConnected', async () => {
    const tree = await renderWithApolloData(
      <Providers>
        <PlayButtonConnected
          coverImageSources={[
            {
              uri:
                'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,q_auto:eco,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3Dfe44d493-b69f-4721-83f7-7942c4f99125',
              __typename: 'ImageMediaSource',
            },
          ]}
          parentChannelName={'Sermon'}
          title={'fake_title'}
          videoSource={{
            uri:
              'http://embed.wistia.com/deliveries/0e364f7e6f6604384ece8a35905a53a864386e9f.bin',
            __typename: 'VideoMediaSource',
          }}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
