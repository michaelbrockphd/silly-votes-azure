import { request } from 'express';
import { StatusCodes } from 'http-status-codes';

const CreateCampaignHandle = (req, res) => {
    const freshCampaign = { ...req.body, email: req.userIdentity.email };

    // If there is an ID field, cut it out.

    if( freshCampaign._id ) {
        delete( freshCampaign._id );
    }

    if( freshCampaign ) {
        const cntx = req.dbContext;

        cntx.Campaigns
            .create( freshCampaign )
            .then( ( created ) => {
                res.status(StatusCodes.OK)
                   .send(created);
            } )
            .catch( ( err ) => {
                console.log(err);

                res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
            } );
    }
    else {
        console.log("Empty request body.");

        res.status(StatusCodes.BAD_REQUEST).end();
    }
};

const DeleteUserCampaignHandle = (req, res) => {
    const userEmail = req.userIdentity.email;

    const campaignId = req.params.id;

    if(!!campaignId && !!userEmail) {
        const cntx = req.dbContext;

        cntx.Campaigns
            .remove( { _id: campaignId, email: userEmail } )
            .then( (_) => {
                // Nothing really to log as only the deletion count is returned.

                res.status(StatusCodes.OK)
                   .send( "Delete complete" );
            } )
            .catch( (err) => {
                // The only time when an error is reported back to the client.
                console.log(err);

                res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                   .send( "Delete failed." );
            } );
    }
    else {
        // If we have missing parameters, just return.
        res.status(StatusCodes.OK)
           .send( "Delete complete" );
    }
};

const ReadAllHandle = (req, res) => {
    const context = req.dbContext;

    context.Campaigns
           .find({})
           .then((matches) => {
                res.status( StatusCodes.OK )
                   .send( matches );
           } )
           .catch((err) => {
               console.log(err);

               res.status( StatusCodes.INTERNAL_SERVER_ERROR )
                  .send(err);
           });
};

const UpdateUserCampaignHandle = (req, res) => {
    const userEmail = req.userIdentity.email;

    const campaignId = req.params.id;

    if(!!campaignId && !!userEmail) {
        // Create a clone and ensure any ID property is removed.

        var updatedCampaign = { ...req.body };

        if( updatedCampaign._id ) {
            delete( updatedCampaign._id );
        }

        const criteria = { _id: campaignId, email: userEmail };

        const cntx = req.dbContext;

        cntx.Campaigns
            .update( criteria, updatedCampaign )
            .then( (_) => {
                // Like with deletes, only the number of changes is returned.
                //
                // Thus nothing to really report home.

                res.status(StatusCodes.OK)
                   .send("Update successful");
            } )
            .catch( (err) => {
                console.log( err );

                res.status(StatusCodes.INTERNAL_SERVER_ERROR)
                   .send("Update failed.");
            } );
    }
    else {
        // If the parameters are invalid, simply report a bad request.
        //
        // Do not hint which parameter failed to resist attacks the cycle through
        // parameter values.
        res.status(StatusCodes.BAD_REQUEST)
           .send( "Update failed." );
    }
};

export {
    CreateCampaignHandle,
    DeleteUserCampaignHandle,
    UpdateUserCampaignHandle,
    ReadAllHandle
};
