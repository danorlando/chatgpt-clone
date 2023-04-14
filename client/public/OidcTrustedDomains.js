// OidcTrustedDomains.js

// Add below trusted domains, access tokens will automatically injected to be send to
// trusted domain can also be a path like https://www.myapi.com/users, 
// then all subroute like https://www.myapi.com/useers/1 will be authorized to send access_token to.

// Domains used by OIDC server must be also declared here
const trustedDomains = {
  default:[ "http://localhost:3080", "https://accounts.google.com"],
  config_google: ["https://oauth2.googleapis.com", "https://openidconnect.googleapis.com", "https://accounts.google.com"],
  config_auth0: ["https://dev-6p6dxb6obb331271.us.auth0.com"],
};