import createContext from '../data/CampaignContext.mjs';

export function createContextMiddleware( roConnectionString ) {
    const rtnMiddleware = (req, res, next) => {
        try
        {
            const context = createContext( roConnectionString );
    
            req.dbContext = context;
    
            next();
        }
        catch
        {
            res.status(500)
               .send("Could not get required context.");
        }
    };

    return( rtnMiddleware );
}

export function preFetchUserCampaigns(req, res, next) {
    if( req.dbContext ) {
        const { userId } = req.params;

        if( userId ) {
            req.dbContext
               .Campaigns
               .find( { email: userId } )
               .then((matches) => {
                   req.existingData = matches;

                   next();
               })
               .catch((err) => {
                   console.log(err);

                   res.status(500)
                      .send(err);
               });
        }
        else {
            res.status(400)
               .send("Invalid parameters");
        }
    }
    else {
        res.status(500)
           .send("No context provided");
    }
}
