export default function preFetchUserCampaigns(req, res, next) {
    if( req.dbContext ) {
        const { userId } = req.userIdentity.email;

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
