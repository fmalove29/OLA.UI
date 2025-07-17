import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/interceptor';

import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { spinnerInterceptorInterceptor } from './shared/interceptors/spinner-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor, spinnerInterceptorInterceptor])
    ),
    importProvidersFrom(MatDialogModule),
    provideAnimations()
  ]
};
