import React, { ReactElement, ForwardRefExoticComponent } from 'react';

type section = 'pokemon';

export interface MenuItem {
  name: string | ReactElement;
  parent?: section;
  adminReq?: boolean;
  path?: string;
  icon?: ForwardRefExoticComponent<any>;
}

export interface AppRoute {
  path: string;
  component: React.FC<any>;
  adminReq?: boolean;
  exact?: boolean;
  disabled?: boolean;
  menuItem?: MenuItem;
}

export interface SubMenuItem {
  name: string | ReactElement;
  id: section;
  disabled?: boolean;
  adminReq?: boolean;
  icon?: React.ForwardRefExoticComponent<any>;
}