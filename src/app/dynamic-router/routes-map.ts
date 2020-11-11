import { Type } from '@angular/core';
import { Route, Routes } from '@angular/router';

import { Observable } from 'rxjs';
import { ModelScopeCreationComponent } from './dynamic-routes.service';

export const mapLazyLoadModule = (
  loadChildren: string,
  path: string,
  featureModule: Observable<Type<any>>
): Partial<Route> => {
  if (loadChildren && featureModule) {
    return {
      path,
      component: ModelScopeCreationComponent,
      loadChildren: () => featureModule,
    };
  }
  return {};
};

export const mapPathOnToRoute = (path: string): Partial<Route> => {
  if (path !== undefined) {
    return { path };
  }
  return { path: '' };
};

export const mapPathMatchToRoute = (pathMatch: string): Partial<Route> => {
  if (pathMatch) {
    return { pathMatch };
  }
  return {};
};

export const mapRedirectToRoute = (redirectTo: string): Partial<Route> => {
  if (redirectTo) {
    return { redirectTo };
  }
  return {};
};

export const mapChildren = (children: Routes): Partial<Route> => {
  if (children && children.length) {
    return { children };
  }
  return {};
};

export const mapComponentName = (component: Type<any>): Partial<Route> => {
  if (component) {
    return { component };
  }
  return {};
};
