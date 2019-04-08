import React from 'react';
import styled, { CardActions } from '@apollosproject/ui-kit';

const Spacer = styled(({ theme }) => ({ height: theme.sizing.baseUnit * 2 }))(
  CardActions
);
const Wrapper = styled({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
})(CardActions);

const CardFooter = (props) => (
  <>
    <Spacer />
    <Wrapper {...props} />
  </>
);

export default CardFooter;
