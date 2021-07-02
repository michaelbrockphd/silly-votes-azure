import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {initializeAuthentication} from './contexts/AuthorizationContext';

initializeAuthentication({
    // you can user your b2clogin.com domain here, setting is optional, will default to this
    instance: process.env.REACT_APP_B2C_LOGIN_URL,

    // your B2C tenant, you can also use tenants GUID here
    tenant: process.env.REACT_APP_B2C_TENANT,
    
    // the policy to use to sign in, can also be a sign up or sign in policy
    signInPolicy: process.env.REACT_APP_B2C_USERFLOW_NAME,

    // the policy to use for password reset
    //resetPolicy: 'mypasswordresetpolicy',

    // the the B2C application you want to authenticate with (that's just a random GUID - get yours from the portal)
    applicationId: process.env.REACT_APP_B2C_APP_ID,

    // where MSAL will store state - localStorage or sessionStorage
    cacheLocation: 'sessionStorage',

    // the scopes you want included in the access token
    scopes: ['profile', 'openid'],

    // optional, the redirect URI - if not specified MSAL will pick up the location from window.href
    redirectUri: process.env.REACT_APP_FE_AUTH_URL_REDIRECT,

    // optional, the URI to redirect to after logout
    postLogoutRedirectUri: process.env.REACT_APP_FE_AUTH_URL_REDIRECT_POST_SIGNOUT,

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
