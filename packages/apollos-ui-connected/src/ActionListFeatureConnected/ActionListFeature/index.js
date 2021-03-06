import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { styled, ActionListCard, H3, H6 } from '@apollosproject/ui-kit';

const Title = styled(
  ({ theme }) => ({
    color: theme.colors.text.tertiary,
  }),
  'ActionListFeature.Title'
)(H6);

const Subtitle = styled({}, 'ActionListFeature.Subtitle')(H3);

const loadingStateArray = [
  {
    id: 'fakeId1',
    title: '',
    subtitle: '',
    parentChannel: {
      id: '',
      name: '',
    },
    image: {
      sources: [
        {
          uri: '',
        },
      ],
    },
  },
  {
    id: 'fakeId2',
    title: '',
    subtitle: '',
    parentChannel: {
      id: '',
      name: '',
    },
    image: {
      sources: [
        {
          uri: '',
        },
      ],
    },
  },
  {
    id: 'fakeId3',
    title: '',
    subtitle: '',
    parentChannel: {
      id: '',
      name: '',
    },
    image: {
      sources: [
        {
          uri: '',
        },
      ],
    },
  },
  {
    id: 'fakeId4',
    title: '',
    subtitle: '',
    parentChannel: {
      id: '',
      name: '',
    },
    image: {
      sources: [
        {
          uri: '',
        },
      ],
    },
  },
];

const ActionListFeature = memo(
  ({
    actions,
    id,
    isLoading,
    loadingStateObject,
    onPressActionListButton,
    onPressItem,
    subtitle,
    title,
  }) =>
    // Only render if loading or if you have actions
    !!(isLoading || actions.length) && (
      <ActionListCard
        isLoading={isLoading}
        key={id}
        header={
          <>
            {isLoading || title ? ( // we check for isloading here so that they are included in the loading state
              <Title numberOfLines={1}>{title}</Title>
            ) : null}
            {isLoading || subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
          </>
        }
        actions={isLoading && !actions.length ? loadingStateObject : actions}
        onPressActionItem={onPressItem}
        onPressActionListButton={onPressActionListButton}
      />
    )
);

ActionListFeature.displayName = 'Features';

ActionListFeature.propTypes = {
  // TODO: refactor ActionListCard to safely render without an actions array.
  actions: PropTypes.arrayOf(PropTypes.shape({})),
  id: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  loadingStateObject: PropTypes.arrayOf(PropTypes.shape({})),
  onPressActionListButton: PropTypes.func,
  onPressItem: PropTypes.func,
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

ActionListFeature.defaultProps = {
  loadingStateObject: loadingStateArray,
  actions: [],
};

export default ActionListFeature;
