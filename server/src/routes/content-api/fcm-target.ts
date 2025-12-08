'use strict';

//  router.

export default  [
    {
        method: 'GET',
        path: '/fcm-targets/count',
        handler: 'fcm-target.count',
        config: {
            policies: [],
        },
    },
    {
        method: 'GET',
        path: '/fcm-targets',
        handler: 'fcm-target.find',
        config: {
            policies: [],
        },
    },
];
