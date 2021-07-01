// Sourced from:
// * https://dev.to/finiam/predictable-react-authentication-with-the-context-api-g10
// * https://www.udemy.com/course/create-serverless-apps-using-azure/learn/lecture/26773158#overview
// * https://www.npmjs.com/package/ad-b2c-react

import authentication from '@kdpw/msal-b2c-react';
import jwt from 'jsonwebtoken';
import {
    createContext,
    useContext,
    useMemo
} from 'react';

const IsAuthenticatedContext = createContext( false );

// Long story short, the msal-b2c-react library has a limitation where any
// element outside the run() and required() calls will not be able to tell if
// the user is logged in or not.
//
// For now, rather than fork and heavily modify the library (it's still a good
// library!) a small kludge is used so the logged in state can be determined.
//
// Basically, the access token scope is kept and window.msal is queried
// directly.
//
// This behaviour will be in its own function, OOS_isLoggedIn, short for
// Out Of Scope.

var authScopes = [];

export function initializeAuthentication( authOptions ) {
    authScopes = authOptions.scopes || [];

    authentication.initialize( authOptions );
};

export function OOS_isLoggedIn() {
    var rtnIsLoggedIn = false;

    const msalApp = window.msal;

    if( msalApp && msalApp.getUser ) {
        const user = msalApp.getUser( authScopes );

        rtnIsLoggedIn = !!user;
    }

    return( rtnIsLoggedIn );
};

export function AuthorizationProvider( {children} ) {
    const getAccessToken = () => {
        return( authentication.getAccessToken() );
    };

    const isLoggedIn = () => {
        return( getAccessToken() ? true : false );
    }

    const currentUser = () => {
        const token = getAccessToken();

        const decoded = jwt.decode(token);

        if(!!decoded) {
            return(decoded.emails[0]);
        }
        else {
            return(null);
        }
    };

    // Expose/pass-thru existing methods.

    const required = authentication.required;
    const signOut = authentication.signOut;

    const memoedValue = useMemo(
        () => ({
            isLoggedIn,
            OOS_isLoggedIn,
            getAccessToken,
            currentUser,
            required,
            signOut
        }),
        [isLoggedIn]
      );

    return(
        <IsAuthenticatedContext.Provider value={memoedValue}>{children}</IsAuthenticatedContext.Provider>
    );
};

export function useAuthorization() {
    return useContext(IsAuthenticatedContext);
}; 
