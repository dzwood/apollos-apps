import React from 'react';
import { Button, styled } from '@apollosproject/ui-kit';
import { Query } from 'react-apollo';
import GET_CONTENT_UP_NEXT from './getContentUpNext';

const UpNextButton = styled(({ theme: { sizing: { baseUnit } } }) => ({
  marginHorizontal: baseUnit,
}))(Button);

const UpNextButtonConnected = ({
  startText,
  continueText,
  doneText,
  Component,
}) => (
  <Query query={GET_CONTENT_UP_NEXT}>
    {({ data }) => <Component title={startText} />}
  </Query>
);

UpNextButtonConnected.defaultProps = {
  startText: 'Begin',
  Component: UpNextButton,
};

export default UpNextButtonConnected;
