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

export {
    CreateCampaignHandle,
    ReadAllHandle
};
