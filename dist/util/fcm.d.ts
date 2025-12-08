import { errors } from '@strapi/utils';
type NotificationEntry = {
    title: string;
    body: string;
    image: string;
    payload: string;
    targetType: string;
    target: string;
};
declare const _default: {
    send: (entry: NotificationEntry) => Promise<string | errors.ValidationError<"Sending notification failed due to insufficient target", NotificationEntry>>;
    initialize: (strapi: any) => Promise<void>;
};
export default _default;
