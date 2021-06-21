import cors from 'cors';
import express from 'express';

import createAuthProxy from './proxies/AuthorizationProxy.js';
import createCampaignProxy from './proxies/CampaignProxy.js';

const app = express();
const port = process.env.FE_WEB_API_PORT || 9000;

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_TEA_POT = 418;
const HTTP_STATUS_UNAUTHORIZED = 401;

// Create and register cors

const corsConfig = {
    exposedHeaders: [ 'Authorization' ]
};

app.use( cors( corsConfig ) );

// Create and register the proxies.

app.use( createAuthProxy() );
app.use( createCampaignProxy() );

// Register any local handles.

app.get( '/', (req, res) => {
    res.status( HTTP_STATUS_TEA_POT )
       .send( "Ask me nicely and I may brew coffee" );
} );

// Finally, listen on the required port.

app.listen( port, () => {
    console.log( `API listening on port, ${port}...` );
} );
