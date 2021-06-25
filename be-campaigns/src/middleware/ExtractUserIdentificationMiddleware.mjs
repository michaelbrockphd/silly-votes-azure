import jwt from 'jsonwebtoken';

export default function extractUserIdentification(req, res, next) {
    const token = req.headers['authorization'];

    if( token ) {
        const decoded = jwt.decode( token );

        if( !!decoded && !!decoded.email ) {
            req.userIdentity = {
                email: decoded.email
            };
        }
        else {
            console.log( "Token decoding failed or decoded token is missing claims." );
        }
    }
    else {
        console.log( "Missing authentication token." );
    }

    if( req.userIdentity ) {
        next();
    }
    else {
        res.status(401).end();
    }
}
