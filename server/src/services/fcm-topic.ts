'use strict';

/**
 *  service.
*/

const contentType = 'plugin::strapi-notifications.fcm-notification'
const uid = 'plugin::strapi-notifications.fcm-topic';
export default ({ strapi }) => ({
    async find(params: { page?: number, pageSize?: number } = {}) {
        const query = strapi.get('query-params').transform(uid, params ?? {});
        const data = await strapi.db.query(uid).findMany(query);
        return {
            data
        }
    },
    async count(params = {}) {
        const query = strapi.get('query-params').transform(uid, params ?? {});
        return strapi.db.query(uid).count(query);
    },


    async findOne(params = {}) {
        const query = strapi.get('query-params').transform(uid, params ?? {});
        return strapi.db.query(uid).findOne(query);
    },

    async create(params = {}) {
        return strapi.db.query(uid).create({
            data: params,
        });
    },

    async update(entityId, params = {}) {
        return strapi.db.query(uid).update({
            where: { id: entityId },
            data: params,
            populate: ['role'],
        });
    },

    async delete(params = {}) {
        const query = strapi.get('query-params').transform(uid, params ?? {});
        return strapi.db.query(uid).delete(query);
    },
});
