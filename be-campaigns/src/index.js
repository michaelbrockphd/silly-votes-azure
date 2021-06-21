import express from 'express';
import fs from 'fs';

const app = express();
const port = process.env.BE_CAMPAIGNS_PORT || 9002;

const HTTP_STATUS_OK = 200;

app.use( express.json() );
app.use( express.urlencoded( { extended : true } ));

// Register the local handles.

app.get( '/campaigns', (req, res) => {
    var rawData = fs.readFileSync('./src/data/testCampaigns.json');

    var testData = JSON.parse(rawData);

    res.status( HTTP_STATUS_OK )
       .send( testData );
} );

// Listen on the required port.

app.listen( port, () => {
    console.log( `API listening on port, ${port}...` );
} );
