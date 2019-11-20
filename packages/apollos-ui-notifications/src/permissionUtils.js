import { Alert, Linking } from 'react-native';
import OneSignal from 'react-native-onesignal';
import gql from 'graphql-tag';

const softPrompt = ({ onConfirm, onCancel }) => {
  Alert.alert(
    'Notifications Disabled',
    'Notifications are disabled for this app. Would you like to enable them now?',
    [
      { text: 'Enable Notifications', onPress: () => onConfirm() },
      { text: 'Cancel', onPress: () => onCancel(), style: 'cancel' },
    ]
  );
};

const getHasPrompted = async () =>
  new Promise((resolve) =>
    OneSignal.getPermissionSubscriptionState((status) =>
      resolve(status.hasPrompted)
    )
  );

const getPushPermissions = async () =>
  new Promise((resolve) =>
    OneSignal.getPermissionSubscriptionState((status) =>
      // Ensure the client (notificationsEnabled) && OneSignal (subscriptionEnabled) are boolean values
      resolve(!!(status.notificationsEnabled && status.subscriptionEnabled))
    )
  );

const promptForPushNotificationsWithUserResponse = async () =>
  new Promise((resolve) =>
    OneSignal.promptForPushNotificationsWithUserResponse(resolve)
  );

const SET_NOTIFCATIONS_ENABLED = gql`
  mutation updatePushPermissions($enabled: Boolean!) {
    updatePushPermissions(enabled: $enabled) @client
  }
`;

const GET_NOTIFICATIONS_ENABLED = gql`
  query getPushPermissions {
    notificationsEnabled @client(always: true)
  }
`;

const GET_PUSH_ID = gql`
  query getPushId {
    pushId @client
  }
`;

const requestPushPermissions = async ({ client }) => {
  const hasPrompted = await getHasPrompted();
  if (hasPrompted) {
    return new Promise((resolve) =>
      softPrompt({
        onConfirm: () => {
          Linking.openSettings();
          client.mutate({
            mutation: SET_NOTIFCATIONS_ENABLED,
            variables: { enabled: true },
          });
          resolve(true);
        },
        onCancel: () => resolve(false),
      })
    );
  }
  const notificationsEnabled = await promptForPushNotificationsWithUserResponse();
  await client.mutate({
    mutation: SET_NOTIFCATIONS_ENABLED,
    variables: { enabled: notificationsEnabled },
  });

  return notificationsEnabled;
};

export {
  getPushPermissions,
  requestPushPermissions,
  GET_NOTIFICATIONS_ENABLED,
  GET_PUSH_ID,
};
