import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { LoaderInterceptor } from './services/loader/loader.interceptor';
import { ToastModule } from 'primeng/toast';
import { HttpErrorInterceptor } from './services/http-error.interceptor';
import { metaReducers, reducers } from './store';
import { Store, StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/effects/auth.effects';
import { getAuth } from './store/auth/actions/auth.actions';
import { Subject, takeUntil } from 'rxjs';
import { selectLoading } from './store/auth/selectors/auth.selectors';

registerLocaleData(localeRu, 'ru');

export function initApp(store: Store): () => Promise<void> {
  return () =>
    new Promise<void>((resolve) => {
      const loaded$ = new Subject<void>();
      store.dispatch(getAuth());
      store
        .select(selectLoading)
        .pipe(takeUntil(loaded$))
        .subscribe((loaded) => {
          if (!loaded) {
            loaded$.next();
            resolve();
          }
        });
    });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    ConfirmDialogModule,
    HttpClientModule,
    ToastModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25 }) : [],
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [
    MessageService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'ru' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [Store],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
