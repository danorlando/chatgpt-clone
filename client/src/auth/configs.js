import { TokenRenewMode } from '@axa-fr/react-oidc';

export const configurationAuth0 = {
  client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
  redirect_uri: window.location.origin + '/authentication/callback',
  silent_redirect_uri: window.location.origin + '/authentication/silent-callback',
  scope: 'openid profile email api offline_access',
  authority: import.meta.env.VITE_AUTH0_AUTHORITY,
  service_worker_relative_url: '/OidcServiceWorker.js',
  service_worker_only: false,
  token_renew_mode: TokenRenewMode.access_token_invalid
};

export const configurationGoogle = {
  client_id: import.meta.env.VITE_GOOGLE_OIDC_CLIENT_ID,
  redirect_uri: window.location.origin + '/authentication/callback',
  // silent_redirect_uri: window.location.origin + '/multi-auth/silent-callback-google',
  // silent_login_uri: window.location.origin + '/authentication/silent-login',
  scope: 'openid profile email',
  authority: 'https://accounts.google.com',
  service_worker_relative_url: '/OidcServiceWorker.js',
  service_worker_only: false,
  token_request_extras: {
      client_secret: import.meta.env.VITE_GOOGLE_OIDC_CLIENT_SECRET,
  },
  monitor_session: false,
};

// export const configurationIdentityServer = {
//   client_id: 'interactive.public.short',
//   redirect_uri: window.location.origin + '/authentication/callback',
//   silent_redirect_uri: window.location.origin + '/authentication/silent-callback',
//   // silent_login_uri: window.location.origin + '/authentication/silent-login',
//   scope: 'openid profile email api offline_access',
//   authority: 'https://cloudchatai.com',
//   // authority_time_cache_wellknowurl_in_second: 60* 60,
//   refresh_time_before_tokens_expiration_in_second: 40,
//   service_worker_relative_url: '/OidcServiceWorker.js',
//   service_worker_only: false,
//   // storage: localStorage,
//   // silent_login_timeout: 3333000
//   // monitor_session: true,
//   extras: { youhou_demo: 'youhou' },
//   token_renew_mode: TokenRenewMode.access_token_invalid,
// };

// export const configurationIdentityServerWithHash = {
//   client_id: 'interactive.public.short',
//   redirect_uri: window.location.origin + '/multi-auth/authentification#authentication-callback',
//   silent_redirect_uri: window.location.origin + '/multi-auth/authentification#authentication-silent-callback',
//   silent_login_uri: window.location.origin + '/multi-auth/authentification#authentication-silent-login',
//   scope: 'openid profile email api offline_access',
//   authority: 'https://cloudchatai.com',
//   refresh_time_before_tokens_expiration_in_second: 10,
//   service_worker_relative_url: '/OidcServiceWorker.js',
//   service_worker_only: false,
// };

// export const configurationIdentityServerWithoutDiscovery = {
//   client_id: 'interactive.public.short',
//   redirect_uri: window.location.origin + '/authentication/callback',
//   silent_redirect_uri: window.location.origin + '/authentication/silent-callback',
//   scope: 'openid profile email api offline_access',
//   authority: 'https://cloudchatai.com',
//   authority_configuration: {
//       authorization_endpoint: 'https://cloudchatai.com/connect/authorize',
//       token_endpoint: 'https://cloudchatai.com/connect/token',
//       userinfo_endpoint: 'https://cloudchatai.com/connect/userinfo',
//       end_session_endpoint: 'https://cloudchatai.com/connect/endsession',
//       revocation_endpoint: 'https://cloudchatai.com/connect/revocation',
//       check_session_iframe: 'https://cloudchatai.com/connect/checksession',
//   },
//   refresh_time_before_tokens_expiration_in_second: 10,
//   service_worker_relative_url: '/OidcServiceWorker.js',
//   service_worker_only: false,
// };