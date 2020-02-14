import React from 'react';
import renderer from 'react-test-renderer';
import wait from 'waait';
import { Providers } from '../utils/testUtils';

import MediaControls from './MediaControls';

describe('MediaControls', () => {
  it('should render default media case', async () => {
    const tree = renderer.create(
      <Providers>
        <MediaControls
          coverImageSources={
            'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,q_auto:eco,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3Dfe44d493-b69f-4721-83f7-7942c4f99125'
          }
          parentChannelName={'Sermon'}
          title={'FAKE_TITLE'}
          videoSource={
            'http://embed.wistia.com/deliveries/0e364f7e6f6604384ece8a35905a53a864386e9f.bin'
          }
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render liveStream case', async () => {
    const tree = renderer.create(
      <Providers>
        <MediaControls
          coverImageSources={[
            {
              uri:
                'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,q_auto:eco,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3Dfe44d493-b69f-4721-83f7-7942c4f99125',
              __typename: 'ImageMediaSource',
            },
          ]}
          liveStreamSource={{
            uri:
              'http://embed.wistia.com/deliveries/0e364f7e6f6604384ece8a35905a53a864386e9f.bin',
            __typename: 'VideoMediaSource',
          }}
          parentChannelName={'FAKE_PARENT_NAME'}
          title={'FAKE_TITLE'}
        />
      </Providers>
    );
    await wait(0); // wait for response from graphql
    expect(tree).toMatchSnapshot();
  });
  it('should render webview case', async () => {
    const tree = renderer.create(
      <Providers>
        <MediaControls
          coverImageSources={[
            {
              uri:
                'https://res.cloudinary.com/apollos/image/fetch/c_limit,f_auto,q_auto:eco,w_1600/https://apollosrock.newspring.cc/GetImage.ashx%3Fguid%3Dfe44d493-b69f-4721-83f7-7942c4f99125',
              __typename: 'ImageMediaSource',
            },
          ]}
          title={'FAKE_TITLE'}
          webViewUrl={{
            uri:
              'http://embed.wistia.com/deliveries/0e364f7e6f6604384ece8a35905a53a864386e9f.bin',
            __typename: 'VideoMediaSource',
          }}
        />
      </Providers>
    );
    await wait(0); // wait for response from graphql
    expect(tree).toMatchSnapshot();
  });
  it('should not render if loading', async () => {
    const tree = renderer.create(
      <Providers>
        <MediaControls loading />
      </Providers>
    );
    await wait(0); // wait for response from graphql
    expect(tree).toMatchSnapshot();
  });
  it('should not render if error', async () => {
    const tree = renderer.create(
      <Providers>
        <MediaControls error={'FAKE_ERROR'} />
      </Providers>
    );
    await wait(0); // wait for response from graphql
    expect(tree).toMatchSnapshot();
  });
});
