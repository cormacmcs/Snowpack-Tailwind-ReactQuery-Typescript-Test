import React from 'react';
import pages from '../pages/pages';
import { AppRoute, SubMenuItem } from '../Interfaces';

// const { REACT_APP_ENV } = process.env;
// const isProd = REACT_APP_ENV === 'production';

export const subMenus: SubMenuItem[] = [{ name: 'Pokemon', id: 'pokemon' }];

let appRoutes: AppRoute[] = [
  {
    path: '/',
    component: pages.Dashboard,
    exact: true,
  },
  {
    path: '/b',
    component: pages.DashboardB,
    exact: true,
  },
  // {
  //   path: '/stream',
  //   component: pages.Stream,
  //   exact: true,
  //   menuItem: { name: <span>Device Stream</span>, parent: 'devices', icon: ImportOutlined }
  // }
];

appRoutes.push({
  path: '/not-found',
  component: pages.NotFound,
  exact: true,
});

export default appRoutes;
