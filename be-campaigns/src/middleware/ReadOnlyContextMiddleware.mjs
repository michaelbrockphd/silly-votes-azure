import createContext from '../data/CampaignContext.mjs';

export default function createContextMiddleware( roConnectionString ) {
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