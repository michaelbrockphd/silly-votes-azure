import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {initializeAuthentication} from './contexts/AuthorizationContext';

initializeAuthentication({
    // you can user your b2clogin.com domain here, setting is optional, will default to this
    instance: 'https://YOUR_TENANT.b2clogin.com/tfp/', 

    // your B2C tenant, you can also use tenants GUID here
    tenant: 'YOUR_TENANT.onmicrosoft.com',
    
    // the policy to use to sign in, can also be a sign up or sign in policy
    signInPolicy: 'B2C User Flow Name',

    // the policy to use for password reset
    //resetPolicy: 'mypasswordresetpolicy',

    // the the B2C application you want to authenticate with (that's just a random GUID - get yours from the portal)
    applicationId: 'B2C App GUID',

    // where MSAL will store state - localStorage or sessionStorage
    cacheLocation: 'sessionStorage',

    // the scopes you want included in the access token
    scopes: ['profile', 'openid'],

    // optional, the redirect URI - if not specified MSAL will pick up the location from window.href
    redirectUri: process.env.FE_AUTH_URL_REDIRECT,

    // optional, the URI to redirect to after logout
    postLogoutRedirectUri: process.env.FE_AUTH_URL_REDIRECT_POST_SIGNOUT,

    // optional, default to true, set to false if you change instance
    validateAuthority: false

    // optional, default to false, set to true if you only want to acquire token silently and avoid redirections to login page
    //silentLoginOnly: false
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
