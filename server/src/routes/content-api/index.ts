'use strict';

import fcmTopic from './fcm-topic'
import fcmNotification from './fcm-notification'
import fcmTarget from './fcm-target'
import fcmPluginConfiguration from './fcm-plugin-configuration'


export default  {
  type: 'content-api',
  routes: [...fcmTopic, ...fcmNotification, ...fcmTarget, ...fcmPluginConfiguration],
};
