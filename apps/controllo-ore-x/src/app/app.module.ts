import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@app/_core/services/auth.service';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

export function initializeApp(
  _authSvc: AuthService,
  router: Router,
): () => void {
  return async (): Promise<void> => {
    await _authSvc.getMe();
    router.createUrlTree(['auth']);
    router.initialNavigation();
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'disabled',
    }),
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatChipsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatMenuModule,
  ],
  providers: [
    {
      // `subscriptSizing` removes the bottom space of the mat-form-fields <DOCS URL>.
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AuthService, Router],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
