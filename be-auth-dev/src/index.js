import cors from 'cors';
import express from 'express';

const app = express();
const port = 9001;

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_FORBIDDEN = 403;

// Register the CORS middleware.

const corsConfig = {
    exposedHeaders: [ 'Authorization' ]
};

app.use( cors( corsConfig ) );

// Register the parsers.

app.use( express.json() );
app.use( express.urlencoded( { extended : true } ))

// Register the handlers.

app.post( '/login', (req, res ) => {
    const requestData = req.body;

    console.log(requestData);

    const userEmail = requestData.email;

    if(userEmail) {
        // For now, just echo the email back.
        res.set({
            "Authorization": userEmail
        });

        res.status( HTTP_STATUS_OK );
    }
    else {
        res.status( HTTP_STATUS_FORBIDDEN );
    }

    res.end();
} );

// Finally, listen on the port.

app.listen( port, () => {
    console.log( `API listening on port, ${port}...` );
} );
