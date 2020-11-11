import { CommonModule } from '@angular/common';
import {
  Compiler,
  COMPILER_OPTIONS,
  CompilerFactory,
  Component,
  ModuleWithProviders,
  NgModule,
} from '@angular/core';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { RouterModule, Routes } from '@angular/router';
import { DynamicRoutesService } from './dynamic-routes.service';

@Component({ template: `<p>loading-component works!</p>` })
export class LoadingComponent {}

@NgModule({
  declarations: [LoadingComponent],
  imports: [CommonModule],
  entryComponents: [LoadingComponent],
})
export class LoadingModule {}

export const initialRoutes: Routes = [
  {
    path: '**',
    canActivate: [DynamicRoutesService],
    component: LoadingComponent,
  },
];

export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler();
}

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(initialRoutes, {
      scrollPositionRestoration: 'enabled',
    }),
    CommonModule,
    LoadingModule,
  ],
  exports: [RouterModule],
  entryComponents: [],
})
export class DynamicRouterModule {
  static forRoot(): ModuleWithProviders<DynamicRouterModule> {
    return {
      ngModule: DynamicRouterModule,
      providers: [
        DynamicRoutesService,
        { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
        {
          provide: CompilerFactory,
          useClass: JitCompilerFactory,
          deps: [COMPILER_OPTIONS],
        },
        {
          provide: Compiler,
          useFactory: createCompiler,
          deps: [CompilerFactory],
        },
      ],
    };
  }
}
