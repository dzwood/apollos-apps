import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { CastButton } from 'react-native-google-cast';

import { styled } from '@apollosproject/ui-kit';

const Wrapper = styled({
  justifyContent: 'center',
  alignItems: 'center',
})(View);

const StyledCastButton = styled(({ theme }) => ({
  width: 40 + theme.sizing.baseUnit * 1.25,
  height: 40 + theme.sizing.baseUnit * 1.25,
  tintColor: 'gray',
}))(CastButton);

const CastBtn = ({ setCastState }) => {
  useEffect(() => {
    console.log('add listeners');
  }, []);
  return (
    <Wrapper>
      <StyledCastButton />
    </Wrapper>
  );
};

CastBtn.propTypes = {
  setCastState: PropTypes.func,
};
export default CastBtn;
