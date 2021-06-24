import { StatusCodes } from 'http-status-codes';

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
    ReadAllHandle
};
