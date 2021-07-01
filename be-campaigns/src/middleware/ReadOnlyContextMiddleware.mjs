import createContext from '../data/CampaignContext.mjs';

export default function createContextMiddleware( options ) {
    const rtnMiddleware = (req, res, next) => {
        try
        {
            const context = createContext( options );
    
            req.dbContext = context;
    
            next();
        }
        catch(err)
        {
            console.log(err);

            res.status(500)
               .send("Could not get required context.");
        }
    };

    return( rtnMiddleware );
}
