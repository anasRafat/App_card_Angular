import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import {canActivate,redirectLoggedInTo,redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { AddCardComponent } from './pages/add-card/add-card.component';
import { UpdateCardComponent } from './pages/update-card/update-card.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  { path: '', component:LoginComponent  },
  { path: 'login', component:LoginComponent ,...canActivate(redirectLoggedInToHome) },
  { path: 'sign_up', component:SignUpComponent, ...canActivate(redirectLoggedInToHome) },
  { path: 'home', component:HomeComponent , ...canActivate(redirectUnauthorizedToLogin),},
  { path: 'add', component:AddCardComponent , ...canActivate(redirectUnauthorizedToLogin),},
  { path: 'update/:id', component:UpdateCardComponent , ...canActivate(redirectUnauthorizedToLogin)},
  { path: '**', component:NotFoundComponent ,...canActivate(redirectUnauthorizedToLogin), },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
