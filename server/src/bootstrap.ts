import fcmUtil from '../../util/fcm'
import type { Core } from '@strapi/strapi';

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  // bootstrap phase
  fcmUtil.initialize(strapi);

};

export default bootstrap;
