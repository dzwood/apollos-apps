import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { Placeholder, H4, H6 } from '@apollosproject/ui-kit';

import { LegalText } from './typography';
import ScriptureHTMLView from './ScriptureHTMLView';

const ScriptureItem = ({ reference, html, copyright, isLoading, translation = 'WEB' }) => (
  <Placeholder.Paragraph
    lineNumber={5}
    onReady={!isLoading}
    lastLineWidth="60%"
    firstLineWidth="40%"
  >
    <View>
      <H4>
        <H4>{reference}</H4> <H6>{translation}</H6>
      </H4>
      <ScriptureHTMLView>{html}</ScriptureHTMLView>
      {copyright === 'PUBLIC DOMAIN' ? null : (
        <LegalText>{copyright}</LegalText>
      )}
    </View>
  </Placeholder.Paragraph>
);

ScriptureItem.propTypes = {
  reference: PropTypes.string,
  html: PropTypes.string,
  translation: PropTypes.string,
  copyright: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default ScriptureItem;
