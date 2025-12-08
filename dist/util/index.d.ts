import type { Core } from '@strapi/strapi';
export declare const checkIsPublished: (data?: any) => boolean;
export declare const getUserDisplayName: (user: any) => any;
export declare const getService: (strapi: Core.Strapi, name: string) => Core.Service;
export declare const getPublisherService: (strapi: Core.Strapi, name: string) => Core.Service;
export declare const getConfigurationService: (strapi: Core.Strapi) => Core.Service;
export declare const handleHookEvent: (event: any) => Promise<void>;
