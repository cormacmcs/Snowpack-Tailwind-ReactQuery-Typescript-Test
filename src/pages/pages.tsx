import React from 'react';

const NotFoundPage = React.lazy(() => import('@app/pages/notFoundPage/notFound.page'));
const DashboardPage = React.lazy(() => import('@app/pages/dashboard/dashboard.page'));
const DashboardBPage = React.lazy(() => import('@app/pages/dashboardB/dashboardB.page'));

const pages = {
  NotFound: NotFoundPage,
  Dashboard: DashboardPage,
  DashboardB: DashboardBPage,
};

export default pages;
