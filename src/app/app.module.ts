import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {RouterModule, RouterOutlet, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {PasswordControlComponent} from "./password-control/password-control.component";
import {HttpClientModule} from "@angular/common/http";
import {AngularSvgIconModule, SvgIconComponent} from "angular-svg-icon";
import {BrowserModule} from "@angular/platform-browser";

const routes: Routes = [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterOutlet,
    ReactiveFormsModule,
    PasswordControlComponent,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
