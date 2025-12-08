'use strict';

/**
 *  service.
 */

import fcmUtil from '../../../util/fcm'

import { propOr } from 'lodash/fp'

// import {
//     useQueryParams,
// } from '@strapi/admin/strapi-admin';


import {
    contentTypes
} from '@strapi/utils';

const { hasDraftAndPublish,
    constants: { PUBLISHED_AT_ATTRIBUTE },
} = contentTypes
const setPublishedAt = data => {
    data[PUBLISHED_AT_ATTRIBUTE] = propOr(new Date(), PUBLISHED_AT_ATTRIBUTE, data);
};

const uid = 'plugin::strapi-notifications.fcm-plugin-configuration';
export default ({ strapi }) => ({
    async find(params = {}) {

        const fetchParams = {
            status: 'published',
            ...params
        };
        // const [{ query: paginationInfo }] = useQueryParams<{
        //     plugins?: Record<string, unknown>;
        //     page?: string;
        //     pageSize?: string;
        //     sort?: string;
        // }>();
        const data = await strapi.documents(uid).findMany({
            ...fetchParams,
            // ...paginationInfo,
        });

        // if (shouldCount(fetchParams)) {
        //     const count = await strapi.entityService.count(uid, { ...fetchParams, ...paginationInfo });

        //     return {
        //         data,
        //         pagination: transformPaginationResponse(paginationInfo, count),
        //     };
        // }

        return {
            data,
            pagination: fetchParams,
        };
    },

    async findOne(entityId, params = {}) {
        return strapi.documents(uid).findOne({
            status: 'published',
            documentId: entityId,
            ...params
        });
    },

    async create(params: {
        [key: string]: any
    } = {}) {
        const { data } = params;
        const count = strapi.query(uid).count();
        if (count < 1) {
            return await strapi.documents(uid).create({ ...params, data });
        } else if (data.id) {
            return await strapi.documents(uid).update({ documentId: data.id, ...params, data });
        }
        return {
            error: 'Only one configuration is allowed, try passing the id to update the existing one.'
        };
    },

    async update(entityId, params: {
        [key: string]: any
    } = {}) {
        const { data } = params;
        const count = strapi.query(uid).count();
        if (count < 1) {
            return await strapi.documents(uid).create({ ...params, data });
        } else {
            return await strapi.documents(uid).update({ documentId: entityId, ...params, data });
        }
    }
});
