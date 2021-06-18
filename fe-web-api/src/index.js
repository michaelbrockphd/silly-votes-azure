import cors from 'cors';
import express from 'express';

const app = express();
const port = 9000;

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_FORBIDDEN = 403;
const HTTP_STATUS_TEA_POT = 418;
const HTTP_STATUS_UNAUTHORIZED = 401;

app.use( express.json() );
app.use( express.urlencoded( { extended : true } ))

const corsConfig = {
    exposedHeaders: [ 'Authorization' ]
};

app.use( cors( corsConfig ) );

app.get( '/', (req, res) => {
    res.status( HTTP_STATUS_TEA_POT )
       .send( "Ask me nicely and I may brew coffee" );
} );

app.post( '/login', (req, res ) => {
    const requestData = req.body;

    const userEmail = requestData.email;

    if(userEmail) {
        // For now, just echo the email back.
        res.set({
            "Authorization": 'userEmail'
        });

        res.status( HTTP_STATUS_OK );

        res.end();
    }
    else {
        res.status( HTTP_STATUS_FORBIDDEN );
    }
} );

app.listen( port, () => {
    console.log( `API listening on port, ${port}...` );
} );
