'use strict';


import { handleHookEvent } from '../../../../util';

import schema from './schema.json'

export default {
    schema,
    lifecycles: {
        async afterCreate(event) {
            try {
                await handleHookEvent(event)
            } catch (error) {
                console.error("Failed to handle notification afterCreate hook", error)
            }
        },
        // async afterPublished(event) {
        //     console.log("notification after publish -->", event)
        //     await handleHookEvent(event)
        // },
    },
};