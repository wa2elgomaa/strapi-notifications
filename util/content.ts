import {
    contentTypes
} from '@strapi/utils'

const { hasDraftAndPublish, constants: { PUBLISHED_AT_ATTRIBUTE }, } = contentTypes


export const setPublishedAt = (data = {}) => {
    if (data[PUBLISHED_AT_ATTRIBUTE]) {
        return true
    }
    return false
}