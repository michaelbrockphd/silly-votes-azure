import createContext from '../data/CampaignContext.mjs';

export default function createContextMiddleware( connectionString ) {
    const rtnMiddleware = (req, res, next) => {
        try
        {
            const context = createContext( connectionString );
    
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
