import React from 'react';
import renderer from 'react-test-renderer';
import { Platform } from 'react-native';
import {
  IntrospectionFragmentMatcher,
  InMemoryCache,
} from 'apollo-cache-inmemory';
import introspectionQueryResultData from 'apolloschurchapp/src/client/fragmentTypes.json';

import { Touchable } from '@apollosproject/ui-kit';

import { Providers } from '../utils/testUtils';

import RockAuthedWebBrowser from '.';

jest.mock('Platform');

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

describe(`RockAuthedWebBrowser Consumer`, () => {
  it('passes a function', async () => {
    renderer.create(
      <Providers
        cache={
          new InMemoryCache({
            fragmentMatcher,
          })
        }
      >
        <RockAuthedWebBrowser>
          {(openUrl) => {
            expect(typeof openUrl).toBe('function');
            return (
              <Touchable
                onPress={() =>
                  openUrl('https://apollosrock.newspring.cc/page/235')
                }
              />
            );
          }}
        </RockAuthedWebBrowser>
      </Providers>
    );
  });
  it('passes a function (Android)', async () => {
    Platform.OS = 'android';
    renderer.create(
      <Providers
        cache={
          new InMemoryCache({
            fragmentMatcher,
          })
        }
      >
        <RockAuthedWebBrowser>
          {(openUrl) => {
            expect(typeof openUrl).toBe('function');
            return (
              <Touchable
                onPress={() =>
                  openUrl('https://apollosrock.newspring.cc/page/235')
                }
              />
            );
          }}
        </RockAuthedWebBrowser>
      </Providers>
    );
  });
});
