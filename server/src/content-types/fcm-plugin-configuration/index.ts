'use strict';

import fcmUtil from '../../../../util/fcm'
import schema from './schema.json'

const uid = 'plugin::strapi-notifications.fcm-plugin-configuration';
export default {
    schema,
    lifecycles: {
        afterCreate(event) {
            if (event?.module?.uid === uid) {
                fcmUtil.initialize(strapi);
            }
        },
        afterUpdate(event) {
            if (event?.module?.uid === uid) {
                fcmUtil.initialize(strapi);
            }
        }
    },
};