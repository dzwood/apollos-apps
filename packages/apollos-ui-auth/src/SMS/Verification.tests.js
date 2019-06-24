import React from 'react';
import renderer from 'react-test-renderer';

import { Providers } from '../testUtils';

import Verification from './Verification';

describe('The Auth Verification component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <Verification setFieldValue={jest.fn()} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with custom confirmationTitleText', () => {
    const tree = renderer.create(
      <Providers>
        <Verification
          setFieldValue={jest.fn()}
          confirmationTitleText={'Custom Title'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  // it('should render with a custom confirmationPromptText', () => {
  //   const tree = renderer.create(
  //     <Providers>
  //       <Verification
  //         setFieldValue={jest.fn()}
  //         confirmationPromptText={'Boom custom prompty text boom'}
  //       />
  //     </Providers>
  //   );
  //   expect(tree).toMatchSnapshot();
  // });
  // it('should render as disabled', () => {
  //   const tree = renderer.create(
  //     <Providers>
  //       <Verification
  //         setFieldValue={jest.fn()}
  //         onPressNext={jest.fn()}
  //         disabled
  //       />
  //     </Providers>
  //   );
  //   expect(tree).toMatchSnapshot();
  // });
  // it('should render in an error state', () => {
  //   const tree = renderer.create(
  //     <Providers>
  //       <Verification
  //         setFieldValue={jest.fn()}
  //         errors={{ phone: 'Boom Error Boom' }}
  //       />
  //     </Providers>
  //   );
  //   expect(tree).toMatchSnapshot();
  // });
  // it('should render in a loading state', () => {
  //   const tree = renderer.create(
  //     <Providers>
  //       <Verification
  //         setFieldValue={jest.fn()}
  //         onPressNext={jest.fn()}
  //         isLoading
  //       />
  //     </Providers>
  //   );
  //   expect(tree).toMatchSnapshot();
  // });
  // it('should render in a next button', () => {
  //   const tree = renderer.create(
  //     <Providers>
  //       <Verification setFieldValue={jest.fn()} onPressNext={jest.fn()} />
  //     </Providers>
  //   );
  //   expect(tree).toMatchSnapshot();
  // });
  // it('should render a custom smsPolicyInfo component', () => {
  //   const tree = renderer.create(
  //     <Providers>
  //       <Verification
  //         setFieldValue={jest.fn()}
  //         smsPolicyInfo={
  //           <H6 style={{ color: 'salmon' }}>Boom custom legalese boom</H6> // eslint-disable-line react-native/no-inline-styles, react-native/no-color-literals
  //         }
  //       />
  //     </Providers>
  //   );
  //   expect(tree).toMatchSnapshot();
  // });
  // it('should render with a value', () => {
  //   const tree = renderer.create(
  //     <Providers>
  //       <Verification
  //         setFieldValue={jest.fn()}
  //         values={{ code: 'Boom value.code boom' }}
  //       />
  //     </Providers>
  //   );
  //   expect(tree).toMatchSnapshot();
  // });
});
