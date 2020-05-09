import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth/auth.guard";
import {CrudComponent} from "./crud/crud.component";
import {UserListComponent} from "./user-list/user-list.component";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard] },
      { path: 'crud', component: CrudComponent, canActivate: [AuthGuard] },
    ] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent, data: {action: 'logout'} },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
    ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
