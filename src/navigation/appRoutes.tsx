import React from 'react';
import pages from '../pages/pages';
import { AppRoute, SubMenuItem } from '../Interfaces';

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
];

appRoutes.push({
  path: '/not-found',
  component: pages.NotFound,
  exact: true,
});

export default appRoutes;
