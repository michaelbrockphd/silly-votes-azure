import cors from 'cors';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = 9000;

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_TEA_POT = 418;
const HTTP_STATUS_UNAUTHORIZED = 401;

// Create and register cors

const corsConfig = {
    exposedHeaders: [ 'Authorization' ]
};

app.use( cors( corsConfig ) );

// Create and register the proxies.

const urlAuthSvc = 'http://localhost:9001';

const proxyAuthSvc = createProxyMiddleware(
    ['/login' ],
    {
        target: urlAuthSvc,
        changeOrigin: true
    }
);

app.use( proxyAuthSvc );

// Create and register the parsers (must be done AFTER the proxies)

app.use( express.json() );
app.use( express.urlencoded( { extended : true } ))

// Register any local handles.

app.get( '/', (req, res) => {
    res.status( HTTP_STATUS_TEA_POT )
       .send( "Ask me nicely and I may brew coffee" );
} );

// Finally, listen on the required port.

app.listen( port, () => {
    console.log( `API listening on port, ${port}...` );
} );
