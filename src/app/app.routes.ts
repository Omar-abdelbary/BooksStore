import { ComponentType } from './../../node_modules/ngx-toastr/portal/portal.d';
import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManagebooksComponent } from './components/managebooks/managebooks.component';

export const routes: Routes = [



  //  auth layouts

  {path:"" , component:AuthComponent , children:[
    {path:"" , redirectTo:"login" , pathMatch:"full" , title:"login"} ,
    {path:"login" , component: LoginComponent , title:"login"} ,
  ]} ,


  // blank layouts

  {path:"" , component: BlankComponent , children:[
    {path:"" , redirectTo:"dashboard" , pathMatch:"full" , title:"dashboard"} ,
    {path:"dashboard" , component:DashboardComponent , title:"dashboard"} ,
    {path:"managebook" , component: ManagebooksComponent , title:"manage books"} ,
    {path:"managebook/:id" , component: ManagebooksComponent , title:"manage books"} ,
  ]} ,



  //  not found

  {path:"**" , redirectTo:"dashboard" , pathMatch:"full" , title:"dashboard"} ,
];
