import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DynamicRouterModule } from './dynamic-router/dynamic-router.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [BrowserModule, DynamicRouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
