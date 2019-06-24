import React from 'react';
import renderer from 'react-test-renderer';

import { Providers } from '../testUtils';

import SMSVerification from './SMSVerification';

describe('The Auth SMSVerification component', () => {
  it('should render', () => {
    const tree = renderer.create(
      <Providers>
        <SMSVerification setFieldValue={jest.fn()} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with custom confirmationTitleText', () => {
    const tree = renderer.create(
      <Providers>
        <SMSVerification
          setFieldValue={jest.fn()}
          confirmationTitleText={'Custom Title'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a custom confirmationPromptText', () => {
    const tree = renderer.create(
      <Providers>
        <SMSVerification
          setFieldValue={jest.fn()}
          confirmationPromptText={'Boom custom prompty text boom'}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render as disabled', () => {
    const tree = renderer.create(
      <Providers>
        <SMSVerification
          setFieldValue={jest.fn()}
          onPressNext={jest.fn()}
          disabled
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render in an error state', () => {
    const tree = renderer.create(
      <Providers>
        <SMSVerification
          setFieldValue={jest.fn()}
          errors={{ code: 'Boom errors.code Boom' }}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render in a loading state', () => {
    const tree = renderer.create(
      <Providers>
        <SMSVerification
          setFieldValue={jest.fn()}
          onPressNext={jest.fn()}
          isLoading
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render in a next button', () => {
    const tree = renderer.create(
      <Providers>
        <SMSVerification setFieldValue={jest.fn()} onPressNext={jest.fn()} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render with a value', () => {
    const tree = renderer.create(
      <Providers>
        <SMSVerification
          setFieldValue={jest.fn()}
          values={{ code: 'Boom values.code boom' }}
        />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
  });
});
