import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'charts', component: ChartsComponent},
  { path: 'main', component: MainComponent},
  { path: 'nav', component: NavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
