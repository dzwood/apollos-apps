import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { uniqBy } from 'lodash';
import getLiveContent from './getLiveContent';

class LiveUpdater extends Component {
  static propTypes = {
    children: PropTypes.node,
    activeLiveStreamContent: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
      })
    ),
    client: PropTypes.shape({ updateFragment: PropTypes.func }),
  };

  componentDidUpdate(prevProps) {
    // If there is a difference between the old active content, and the new active content
    if (
      uniqBy(
        prevProps.activeLiveStreamContent,
        this.props.activeLiveStreamContent
      ).length !== 0
    ) {
      this.updateLiveCache();
    }
  }

  updateLiveCache() {
    this.props.activeLiveStreamContent.map(({ id, liveStream }) => {
      this.props.client.updateFragment({
        id,
        fragment: gql`
          fragment LiveItem on WeekendContentItem {
            liveStream {
              isLive
              eventStartTime
              media {
                sources {
                  uri
                }
              }
              webViewUrl
            }
          }
        `,
        data: { liveStream },
      });
    });
  }

  render() {
    return this.props.children;
  }
}

const LiveProvider = (props) => (
  <Query query={getLiveContent} pollInterval={30000}>
    {({ data: { activeLiveStreamContent = [] } = {}, client }) => (
      <LiveUpdater client={client} liveContent={activeLiveStreamContent}>
        {props.children}
      </LiveUpdater>
    )}
  </Query>
);

LiveProvider.propTypes = { children: PropTypes.node };

export default LiveProvider;
