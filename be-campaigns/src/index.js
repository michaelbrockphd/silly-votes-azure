import express from 'express';
import fs from 'fs';

import createContext from './data/CampaignContext.js';

const app = express();
const port = process.env.BE_CAMPAIGNS_PORT || 9002;

const dbConnectionString = process.env.DB_RO || 'mongodb://adent:earth@localhost:27017/sillyvotes';

const HTTP_STATUS_OK = 200;
const HTTP_SERVER_ERROR = 500;

app.use( express.json() );
app.use( express.urlencoded( { extended : true } ));

// Register the local handles.

/*app.get( '/campaigns', (req, res) => {
    var rawData = fs.readFileSync('./src/data/testCampaigns.json');

    var testData = JSON.parse(rawData);

    res.status( HTTP_STATUS_OK )
       .send( testData );
} );*/

app.get( '/campaigns', (req, res) => {
    const context = createContext( dbConnectionString );

    context.Campaigns
           .find({})
           .then((matches) => {
                res.status( HTTP_STATUS_OK )
                   .send( matches );
           } )
           .catch((err) => {
               console.log(err);

               res.status( HTTP_SERVER_ERROR )
                  .send(err);
           });
} );

// Listen on the required port.

app.listen( port, () => {
    console.log( `API listening on port, ${port}...` );
} );
