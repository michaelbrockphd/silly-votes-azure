import cors from 'cors';
import express from 'express';
import jwt from 'express-jwt';

import ProxyFactory from './proxies.mjs';

// Constants

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_TEA_POT = 418;
const HTTP_STATUS_UNAUTHORIZED = 401;

// Initialize from any environment variables first.

const port = process.env.FE_WEB_API_PORT || 9000;

const jwt_secret = process.env.JWT_SECRET;

const proxyUrlAuthorization = process.env.BE_AUTH_URL || 'http://localhost:9001';
const proxyUrlCampaigns = process.env.BE_CAMPAIGNS_URL || 'http://localhost:9002';

// Now, initialize the other variables/constants.

const app = express();

// Create and register cors

const corsConfig = {
    exposedHeaders: [ 'Authorization' ]
};

app.use( cors( corsConfig ) );

// Prepare any common middleware.

const verifyJwt = jwt({
    secret: jwt_secret,
    algorithms: ['RS256'],
    requestProperty: 'userAuthorization'
});

// Create and register the proxies.

app.use( ProxyFactory.createCampaignProxy( proxyUrlCampaigns ) );

app.use( verifyJwt, ProxyFactory.createAuthorizationProxy( proxyUrlAuthorization ) );
app.use( verifyJwt, ProxyFactory.createUserCampaignProxy( proxyUrlCampaigns ) );

// Register any local handles.

app.get( '/', (req, res) => {
    res.status( HTTP_STATUS_TEA_POT )
       .send( "Ask me nicely and I may brew coffee" );
} );

// Finally, listen on the required port.

app.listen( port, () => {
    console.log( `API listening on port, ${port}...` );
} );
