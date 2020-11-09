import { Route } from '@angular/compiler/src/core';
import { Compiler, Injectable, NgModule, Type } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { from, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import {
  mapChildren,
  mapComponentName,
  mapData,
  mapLazyLoadModule,
  mapOutlet,
  mapPathMatchToRoute,
  mapPathOnToRoute,
  mapRedirectToRoute,
} from './routes-map';
import { ModelScopeCreationComponent } from './model-scope-creation/model-scope-creation.component';
import { DynamicType1Component } from '../dynamic-type1/dynamic-type1.component';

const defaultAppRoute = {
  routes: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'app1',
    },
    {
      path: 'app1',
      componentName: 'fullLayout',
      data: {
        screenConfig: [],
      },
      children: [
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'set-focus-action',
        },
        {
          path: 'set-focus-action',
          loadChildren: {
            routes: [
              {
                path: '',
                redirectTo: 'dynamic1',
              },
              {
                path: 'dynamic1',
                componentName: 'dynamicType1',
                data: {},
              },
            ],
          },
        },
      ],
    },
  ],
};

@Injectable({
  providedIn: 'root',
})
export class DynamicRoutesService implements CanActivate {
  constructor(private router: Router, private compiler: Compiler) {
    console.log('HG In dynamic routes service');
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const _config = [...this.router.config].filter((c) => c.path !== '**');

    return this.getRoutes('').pipe(
      map(({ routes }) => [
        ..._config,
        { path: '', component: ModelScopeCreationComponent, children: routes },
      ]),
      tap((routes) => this.router.resetConfig(routes)),
      tap(() => this.router.navigateByUrl(state.url)),
      map(() => true)
    );
  }

  private getRoutes(childRoutes): Observable<{ routes: Route[] }> {
    const routes = childRoutes || defaultAppRoute;

    return of(routes).pipe(
      map(({ routes }) => {
        return {
          routes: this.mapToValidAngularRoutes(routes || []),
        };
      })
    );
  }

  private mapToValidAngularRoutes(routesConfig: any[] = []): Routes {
    return routesConfig.map(
      ({
        path,
        pathMatch,
        componentName,
        redirectTo,
        outlet,
        data,
        children,
        loadChildren,
      }) => {
        return {
          ...mapLazyLoadModule(
            loadChildren,
            path,
            this.featureModule(loadChildren)
          ),
          ...mapPathOnToRoute(path),
          ...mapPathMatchToRoute(pathMatch),
          ...mapRedirectToRoute(redirectTo),
          ...mapData(data),
          ...mapComponentName(this.getDynamicLayoutMap(componentName)),
          ...mapChildren(this.mapToValidAngularRoutes(children)),
          ...mapOutlet(outlet),
        };
      }
    );
  }

  getDynamicLayoutMap(componentName) {
    if (componentName === 'fullLayout') {
      return ModelScopeCreationComponent;
    } else if (componentName === 'dynamicType1') {
      return DynamicType1Component;
    }
  }

  private featureModule(loadChildren: string): Observable<Type<any>> {
    return this.getRoutes(loadChildren).pipe(
      switchMap((routesConfig) => {
        const module = NgModule(this.createFeatureModule(routesConfig))(
          class {}
        );
        return from(this.compiler.compileModuleAsync(module));
      }),
      map((m) => {
        return m.moduleType;
      })
    );
  }

  private createFeatureModule({ routes }): NgModule {
    return {
      imports: [RouterModule.forChild(routes)],
      providers: [],
    };
  }
}