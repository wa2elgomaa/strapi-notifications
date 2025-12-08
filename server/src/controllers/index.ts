'use strict';

import fcmTopic from './fcm-topic'
import fcmNotification from './fcm-notification'
import fcmTarget from './fcm-target'
import fcmPluginConfiguration from './fcm-plugin-configuration'

const controllers: any = {
  'fcm-target': fcmTarget,
  'fcm-topic': fcmTopic,
  'fcm-notification': fcmNotification,
  'fcm-plugin-configuration': fcmPluginConfiguration,
};
export default controllers