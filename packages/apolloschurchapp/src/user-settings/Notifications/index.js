import React, { memo } from 'react';
import { Query } from 'react-apollo';

import { GET_NOTIFICATIONS_ENABLED } from '@apollosproject/ui-notifications';

import Notifications from './Notifications';

const NotificationsConnected = memo(() => (
  <Query query={GET_NOTIFICATIONS_ENABLED}>
    {({ data: { notificationsEnabled = false } = {} }) => (
      <Notifications notificationsEnabled={notificationsEnabled} />
    )}
  </Query>
));

NotificationsConnected.displayName = 'NotificationsConnected';
export default NotificationsConnected;
