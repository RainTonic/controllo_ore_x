import { NgModule } from '@angular/core';

import { UnauthRoutingModule } from './unauth-routing.module';
import { LoginPage } from './pages/login/login.page';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    CommonModule,
    UnauthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
})
export class UnauthModule { }
