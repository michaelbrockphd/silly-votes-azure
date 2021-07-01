import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

var client = null;

const initialize = ( uri ) => {
    client = jwksClient({
        jwksUri: uri
    });
};

const getSigningKey = ( header, callback ) => {
    // Modified from https://www.npmjs.com/package/jsonwebtoken

    const clientCallBack = ( err, key ) => {
        if( !err ) {
            var signingKey = key.publicKey || key.rsaPublicKey;

            callback( null, signingKey );
        }
        else {
            console.log( `Failed to get signing key: ${err}` );

            callback( err, null );
        }
    }

    client.getSigningKey( header.kid, clientCallBack );
};

const VerifyJwtMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if( token ) {
        jwt.verify( token, getSigningKey, function( err, _ ) {
            if( !err ) {
                next();
            }
            else {
                console.log( err );

                res.status(StatusCodes.UNAUTHORIZED).end();
            }
        } );
    }
    else {
        res.status(StatusCodes.BAD_REQUEST).end();
    }
};

export {
    initialize,
    VerifyJwtMiddleware
}
