import React, { PureComponent } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import { HeaderTitle } from 'react-navigation';

import {
  FeedView,
  BackgroundView,
  styled,
  PaddedView,
  SearchInput,
} from '@apollosproject/ui-kit';

import TileContentFeed from './TileContentFeed';
import GET_CONTENT_CHANNELS from './getContentChannels';

const childContentItemLoadingState = {
  title: '',
  isLoading: true,
};

const feedItemLoadingState = {
  name: '',
  isLoading: true,
};

const HeaderWrapper = styled(({ theme }) => ({
  flex: 1,
  alignItems: Platform.OS === 'ios' ? 'center' : 'flex-start',
  alignSelf: 'flex-start',
  paddingTop: theme.sizing.baseUnit * 0.75,
}))(View);

const SearchWrapper = styled({
  width: '100%',
})(PaddedView);

const Header = () => (
  <HeaderWrapper>
    <HeaderTitle>Discover</HeaderTitle>
    <SearchWrapper>
      <SearchInput />
    </SearchWrapper>
  </HeaderWrapper>
);

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'ios' ? 98 : 103, // Optically this is what we need. 🧙‍About as magic a number could be.
  },
});

class Discover extends PureComponent {
  renderItem = ({ item }) => (
    <TileContentFeed
      id={item.id}
      name={item.name}
      content={get(item, 'childContentItemsConnection.edges', []).map(
        (edge) => edge.node
      )}
      isLoading={item.isLoading}
      loadingStateObject={childContentItemLoadingState}
    />
  );

  render() {
    return (
      <BackgroundView>
        <Query query={GET_CONTENT_CHANNELS} fetchPolicy="cache-and-network">
          {({
            error,
            loading,
            data: { contentChannels = [] } = {},
            refetch,
          }) => (
            <FeedView
              error={error}
              content={contentChannels}
              isLoading={loading}
              refetch={refetch}
              renderItem={this.renderItem}
              loadingStateObject={feedItemLoadingState}
              numColumns={1}
            />
          )}
        </Query>
      </BackgroundView>
    );
  }
}

Discover.navigationOptions = {
  title: 'Discover',
  headerTitle: <Header />,
  headerStyle: styles.header,
};

export default Discover;
