import { RESTDataSource } from 'apollo-datasource-rest';
import ApollosConfig from '@apollosproject/config';

const { ONE_SIGNAL } = ApollosConfig;

export default class OneSignal extends RESTDataSource {
  baseURL = 'https://onesignal.com/api/v1/';

  async updateExternalUserId({ playerId, userId }) {
    return this.put(`players/${playerId}`, {
      app_id: ONE_SIGNAL.APP_ID,
      external_user_id: userId,
    });
  }

  async updatePushSettings({ enabled, pushProviderUserId }) {
    const { Auth, PersonalDevice } = this.context.dataSources;
    const currentUser = await Auth.getCurrentPerson();

    if (enabled != null && pushProviderUserId != null)
      await PersonalDevice.updateNotificationsEnabled(
        pushProviderUserId,
        enabled
      );

    if (pushProviderUserId != null) {
      await this.updateExternalUserId({
        playerId: pushProviderUserId,
        userId: currentUser.primaryAliasId,
      });
    }
    return currentUser;
  }
}
