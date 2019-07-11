import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity } from 'react-native';

import { ActionCard, BodyText } from '@apollosproject/ui-kit';

const FillInTheBlankFeature = ({ body, contentId, header }) => {
  const [isPressed, press] = useState(false);
  const bodyWithBlank = body.replace(/__(.*)__/gm, (match, p1) =>
    '_'.repeat(p1.length)
  );

  const bodyWithWord = body.replace(/__(.*)__/gm, (match, p1) => p1);
  return (
    <TouchableOpacity
      onPress={() => {
        press(true);
      }}
    >
      <ActionCard label={header} icon={'play'}>
        <BodyText>{isPressed ? bodyWithWord : bodyWithBlank}</BodyText>
      </ActionCard>
    </TouchableOpacity>
  );
};

FillInTheBlankFeature.propTypes = {
  body: PropTypes.string.isRequired,
  contentId: PropTypes.string.isRequired,
};

export const FILL_IN_THE_BLANK_FEATURE_FRAGMENT = `
fragment FillInTheBlankFeatureFragment on FillInTheBlankFeature {
  body
  id
  header
}
`;

export default FillInTheBlankFeature;
