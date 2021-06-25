import express from 'express';

import {
    CreateCampaignHandle as hdlCreate,
    DeleteUserCampaignHandle as hdlDelete,
    ReadAllHandle as hdlCampaigns,
    UpdateUserCampaignHandle as hdlUpdate } from './handles/CampaignHandles.mjs';
import mdlExtractUsrId from './middleware/ExtractUserIdentificationMiddleware.mjs';
import mdlPrefetchUsrCmpg from './middleware/PrefetchUserCampaignsMiddleware.mjs';
import createDbCtxMdl from './middleware/ReadOnlyContextMiddleware.mjs';

const app = express();
const port = process.env.BE_CAMPAIGNS_PORT || 9002;

const roConnStr = process.env.DB_RO || 'mongodb://adent:earth@localhost:27017/sillyvotes';
const rwConnStr = process.env.DB_RW || 'mongodb://fprefect:galaxy@localhost:27017/sillyvotes';

app.use( express.json() );
app.use( express.urlencoded( { extended : true } ));

// Register the local handles.
//
// Based on https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-5.0&tabs=visual-studio

const mdlSetRoContext = createDbCtxMdl( roConnStr );
const mdlSetRwContext = createDbCtxMdl( rwConnStr );

app.get(
    '/campaigns',
    mdlSetRoContext,
    hdlCampaigns
);

app.get(
    '/usercampaigns/',
    mdlExtractUsrId,
    mdlSetRoContext,
    mdlPrefetchUsrCmpg,
    (req, res) => {
        // Nothing much to do, other than just return the data.
        res.status(200)
           .send(req.existingData);
    }
);

app.post(
    '/usercampaigns',
    mdlExtractUsrId,
    mdlSetRwContext,
    hdlCreate
);

app.put(
    '/usercampaigns/:id',
    mdlExtractUsrId,
    mdlSetRwContext,
    hdlUpdate
);

app.delete(
    '/usercampaigns/:id',
    mdlExtractUsrId,
    mdlSetRwContext,
    hdlDelete
);

// Listen on the required port.

app.listen( port, () => {
    console.log( `API listening on port, ${port}...` );
} );
