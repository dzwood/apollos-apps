import React from 'react';
import renderer from 'react-test-renderer';

import Providers from '../Providers';

import ConnectedImage from '.';

describe('the ConnectedImage component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <ConnectedImage
          source={{
            uri: 'https://placeholdit.co/i/150x150?bg=eeeeee&fc=577084',
            width: 150,
            height: 150,
          }}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should maintain aspect ratio', () => {
    const tree = renderer.create(
      <Providers>
        <ConnectedImage
          source={{
            uri: 'https://placeholdit.co/i/150x150?bg=eeeeee&fc=577084',
            width: 150,
            height: 150,
          }}
          maintainAspectRatio
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a minAspectRatio', () => {
    const tree = renderer.create(
      <Providers>
        <ConnectedImage // should render as short
          source={{
            uri: 'https://picsum.photos/200/200/?random',
            width: 200,
            height: 200,
          }}
          maintainAspectRatio
          minAspectRatio={2}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a maxAspectRatio', () => {
    const tree = renderer.create(
      <Providers>
        <ConnectedImage // should render as tall
          source={{
            uri: 'https://picsum.photos/200/200/?random',
            width: 200,
            height: 200,
          }}
          maintainAspectRatio
          maxAspectRatio={0.5}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render between minAspectRatio and maxAspectRatio', () => {
    const tree = renderer.create(
      <Providers>
        <ConnectedImage // should render square
          source={{
            uri: 'https://picsum.photos/200/200/?random',
            width: 200,
            height: 200,
          }}
          maintainAspectRatio
          minAspectRatio={0.5}
          maxAspectRatio={1.5}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should throw an error if minAspectRatio is used without maintainAspectRatio', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    renderer.create(
      <Providers>
        <ConnectedImage // should render square
          source={{
            uri: 'https://picsum.photos/200/200/?random',
            width: 200,
            height: 200,
          }}
          minAspectRatio={1.5}
        />
      </Providers>
    );

    expect(console.error.mock.calls).toMatchSnapshot(); // eslint-disable-line no-console
  });
  it('should throw an error if maxAspectRatio is used without maintainAspectRatio', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    renderer.create(
      <Providers>
        <ConnectedImage // should render square
          source={{
            uri: 'https://picsum.photos/200/200/?random',
            width: 200,
            height: 200,
          }}
          maxAspectRatio={1.5}
        />
      </Providers>
    );

    expect(console.error.mock.calls).toMatchSnapshot(); // eslint-disable-line no-console
  });
  it('should render a loading state', () => {
    const tree = renderer.create(
      <Providers>
        <ConnectedImage
          source={{
            uri: 'https://placeholdit.co/i/150x150?bg=eeeeee&fc=577084',
            width: 150,
            height: 150,
          }}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
