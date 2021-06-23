import express from 'express';

//import createContext from './data/CampaignContext.mjs';
import {
    createContextMiddleware,
    preFetchUserCampaigns as getUserCampaigns } from './middleware/InitialDataMiddleware.mjs';

const app = express();
const port = process.env.BE_CAMPAIGNS_PORT || 9002;

const roConnStr = process.env.DB_RO || 'mongodb://adent:earth@localhost:27017/sillyvotes';

const HTTP_STATUS_OK = 200;
const HTTP_SERVER_ERROR = 500;

app.use( express.json() );
app.use( express.urlencoded( { extended : true } ));

// Register the local handles.
//
// TODO: Decide if keeping '/campaigns' holds any value.

/*
    Take the example in https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio
    
    GET /campaigns - all campaigns.
    GET /campaigns/:userId - get campaigns for the specified user.
    POST /campaigns - create a new campaign.
    PUT /campaigns/:id - update an existing campaign
    DELETE /campaigns/id - name says it all.

    Based on my limited understanding, having the ID in put is OK as it means the body should only have the changes and not a whole object.
*/

const setRoContext = createContextMiddleware( roConnStr );

app.get( '/campaigns/:userId', setRoContext, getUserCampaigns, (req, res) => {
    // Nothing much to do, other than just return the data.
    res.status(200)
       .send(req.existingData);
} );

app.get( '/campaigns', setRoContext, (req, res) => {
    const context = req.dbContext;

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
