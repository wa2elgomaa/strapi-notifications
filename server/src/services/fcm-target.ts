'use strict';
import { getConfigurationService } from '../../../util';

const uid = 'plugin::strapi-notifications.fcm-topic';
const defaultNameSpace = 'plugin::users-permissions.user'
const defaultRolesNamespace = 'plugin::users-permissions.role'
const defaultTokenField = 'fcm'
const defaultLabelField = 'username'

export default ({ strapi }) => ({
    async find(params: { page?: number, pageSize?: number } = {}) {
        const query = strapi.get('query-params').transform(uid, { status: 'published', ...params });

        const configs = (await getConfigurationService(strapi).find()).data;

        const namespace = configs.namespace || defaultNameSpace;
        const rolesNamespace = configs.rolesNamespace || defaultRolesNamespace;
        const tokenField = configs.tokenField || defaultTokenField
        const labelField = configs.labelField || defaultLabelField;

        const targets = await strapi.db.query(uid).findMany(query);
        const usersWithTokens = await strapi.db.query(namespace).findMany({
            where: {
                [tokenField]: {
                    $ne: null
                }
            }
        })
        const rolesAsTopics = await strapi.db.query(rolesNamespace).findMany({})
        return {
            data: [
                ...(targets || []),
                ...(usersWithTokens || []).map((user) => ({
                    label: user[labelField],
                    name: user[tokenField],
                    type: 'token'
                })),
                ...(rolesAsTopics || []).map((role) => ({
                    label: role.name,
                    name: role.type,
                    type: 'topic'
                }))
            ]
        }
    },
    async count(params = {}) {
        const query = strapi.get('query-params').transform(uid, { status: 'published', ...params });
        const configs = (await getConfigurationService(strapi).find()).data;

        const namespace = configs.namespace || defaultNameSpace;
        const rolesNamespace = configs.rolesNamespace || defaultRolesNamespace;
        const tokenField = configs.tokenField || defaultTokenField

        const count = await strapi.db.query(uid).count(query);
        const usersWithTokens = await strapi.db.query(namespace).count({
            where: {
                [tokenField]: {
                    $ne: null
                }
            }
        })
        const rolesAsTopics = await strapi.db.query(rolesNamespace).count({})
        return count + usersWithTokens + rolesAsTopics
    },

});
