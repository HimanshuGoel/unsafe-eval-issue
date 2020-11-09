import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StringComponent } from './dynamic-type1/string/string.component';
import { NumberComponent } from './dynamic-type1/number/number.component';
import { DynamicRouterModule } from './dynamic-router/dynamic-router.module';

@NgModule({
  declarations: [
    AppComponent,
    NumberComponent,
    StringComponent
  ],
  imports: [BrowserModule, DynamicRouterModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
