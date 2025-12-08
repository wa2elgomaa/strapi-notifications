/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Page } from '@strapi/strapi/admin';

import HomePage from '../HomePage';
import TargetsPage from '../TargetsPage';

import { Pencil } from '@strapi/icons';
import { Button, Box } from '@strapi/design-system';

export const App = () => {
  const history = useNavigate();

  return (
    <Box background="neutral100" padding={8}>
      <Box padding={4} background="neutral0" hasRadius shadow="tableShadow">
        <Box background="neutral0" paddingBottom={4}>
          <Button
            style={{ margin: '0 0 0 auto' }}
            variant="secondary"
            endIcon={<Pencil />}
            onClick={() =>
              history('/content-manager/single-types/plugin::strapi-notifications.fcm-plugin-configuration')
            }
          >
            Configuration
          </Button>
        </Box>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path={`/targets`} element={<TargetsPage />} />
          <Route path="*" element={<Page.Error />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default { App };
