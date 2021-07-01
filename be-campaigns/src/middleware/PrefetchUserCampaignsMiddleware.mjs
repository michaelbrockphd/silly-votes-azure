export default function preFetchUserCampaigns(req, res, next) {
    if( req.dbContext ) {
        const userId = req.userIdentity.email;

        if( userId ) {
            const querySpecification = {
                query: `SELECT * from c where c.email = '${userId}'`
            };

            req.dbContext
               .Campaigns
               .query( querySpecification )
               .fetchAll()
               .then((result) => {
                   const { resources: matches } = result;

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
