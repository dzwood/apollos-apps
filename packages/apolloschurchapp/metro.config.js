/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const flatten = (array) =>
  array.reduce((accum, curr) => curr.concat(accum), []);

const localDeps = [
  path.resolve('..', 'apollos-ui-kit'),
  path.resolve('..', 'apollos-ui-passes'),
  path.resolve('..', 'apollos-ui-auth'),
  path.resolve('..', 'apollos-ui-htmlview'),
  path.resolve('..', 'apollos-ui-analytics'),
  path.resolve('..', 'apollos-ui-storybook'),
  path.resolve('..', 'apollos-ui-onboarding'),
  path.resolve('..', 'apollos-ui-media-player'),
  path.resolve('..', 'apollos-ui-scripture'),
  path.resolve('..', 'apollos-ui-notifications'),
];

const sharedNativeModules = [
  'react-native-linear-gradient',
  'react-native-svg',
  'react-native-onesignal',
  'react-native-music-control',
  'react-native-video',
  'react-native-video-controls',
  'react-native-airplay-btn',
  'react-native-passkit-wallet',
  'react',
  'react-native',
  'react-native-svg',
];

module.exports = {
  resolver: {
    extraNodeModules: {
      ...sharedNativeModules.reduce(
        (accum, curr) => ({
          ...accum,
          [curr]: path.resolve('.', `node_modules/${curr}`),
        }),
        {}
      ),
    },
    blacklistRE: blacklist([
      ...flatten(
        localDeps.map((depPath) =>
          sharedNativeModules.map(
            (moduleName) =>
              new RegExp(`${depPath}/node_modules/${moduleName}/.*`)
          )
        )
      ),
      ...sharedNativeModules.map(
        (moduleName) =>
          new RegExp(`${path.resolve(`../../node_modules/${moduleName}`)}/.*`)
      ),
      ...localDeps.map(
        (depPath) =>
          new RegExp(`${depPath}/node_modules/.*/node_modules/react-native/.*`)
      ),
      new RegExp(
        `${path.resolve('.', 'node_modules')}/.*/node_modules/react-native/.*`
      ),
      new RegExp(
        `${path.resolve('..', '..', 'node_modules', 'react-native')}/.*`
      ),
      new RegExp(
        `${path.resolve(
          '..',
          '..',
          'node_modules'
        )}/.*/node_modules/react-native/.*`
      ),
    ]),
  },
  watchFolders: [...localDeps, path.resolve('..', '..', 'node_modules')],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
