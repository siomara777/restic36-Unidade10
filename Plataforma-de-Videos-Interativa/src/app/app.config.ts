import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAuth0({
      domain: 'dev-yp8wi18hj3yjl2vh.us.auth0.com',
      clientId: 'MBB748eOBBC88LkseSjANB5j16dudd9N',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-yp8wi18hj3yjl2vh.us.auth0.com/api/v2/',
        scope: 'openid profile email offline_access'
      },
      useRefreshTokens: true,
      cacheLocation: 'localstorage'
    })
  ]
};
