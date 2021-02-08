import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const checkRoute = (route, subMenus, admin) => {
  if (route.menuItem?.parent) {
    const parent = subMenus.find((subMenu) => subMenu.id === route.menuItem.parent);
    route.disabled = parent.disabled || (route.adminReq && !admin) || (parent.adminReq && !admin);
  }
  return route;
};

const WaitingComponent = (Component) => {
  return (props) => (
    <Suspense fallback={<div className='dark:text-white'>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

export default function routeNavigator({ appRoutes, subMenus = [], admin = false }) {
  const routes = appRoutes.map((route) => checkRoute(route, subMenus, admin));
  return (
    <div className='text-center h-full  dark:bg-gray-800'>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={index}
            exact={route.exact}
            path={route.path}
            component={WaitingComponent(!route.disabled ? route.component : routes[routes.length - 1].component)}
          />
        ))}
        <Route component={WaitingComponent(routes[routes.length - 1].component)} />
      </Switch>
    </div>
  );
}
