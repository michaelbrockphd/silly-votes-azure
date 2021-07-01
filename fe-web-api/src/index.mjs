import cors from 'cors';
import express from 'express';

import {
        initialize,
        VerifyJwtMiddleware as mdlVerifyJwt
    } from './middleware.mjs';
import ProxyFactory from './proxies.mjs';

// Initialize from any environment variables first.

const port = process.env.FE_WEB_API_PORT || 9000;

const proxyUrlCampaigns = process.env.BE_CAMPAIGNS_URL || 'http://localhost:9002';

initialize( process.env.AUTH_URI );

// Now, initialize the other variables/constants.

const app = express();

// Create and register cors

const corsConfig = {
    exposedHeaders: [ 'Authorization' ]
};

app.use( cors( corsConfig ) );

// Create and register the proxies.

app.use( ProxyFactory.createCampaignProxy( proxyUrlCampaigns ) );

app.use(
    mdlVerifyJwt,
    ProxyFactory.createUserCampaignProxy( proxyUrlCampaigns )
);

// Finally, listen on the required port.

app.listen( port, () => {
    console.log( `API listening on port, ${port}...` );
} );
