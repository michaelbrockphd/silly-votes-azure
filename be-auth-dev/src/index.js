import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
const port = process.env.BE_AUTH_DEV_PORT || 9001;

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_FORBIDDEN = 403;

// TODO: Make this a docker secret

const secret = "gakushuu fukurou";

// Register the parsers.

app.use( express.json() );
app.use( express.urlencoded( { extended : true } ))

// Register the handlers.

app.post( '/login', (req, res ) => {
    const requestData = req.body;

    const userEmail = requestData.email;

    if(userEmail) {
        const clearToken = {
            email: userEmail
        };

        const options = {
            expiresIn: "2h"
        };

        const token = jwt.sign( clearToken, secret, options );

        res.set({
            "Authorization": token
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
