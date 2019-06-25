import React, { memo } from 'react';
import { Query } from 'react-apollo';

import { GET_NOTIFICATIONS_ENABLED } from '@apollosproject/ui-notifications';

import Notifications from './Notifications';

const NotificationsConnected = memo(() => (
  // TODO: add toggle mutation
  // TODO: this is the wrong query, we'll use a new one that pulls from Rock
  <Query query={GET_NOTIFICATIONS_ENABLED}>
    {({ data: { notificationsEnabled = false } = {} }) => (
      <Notifications notificationsEnabled={notificationsEnabled} />
    )}
  </Query>
));

NotificationsConnected.displayName = 'NotificationsConnected';
export default NotificationsConnected;
