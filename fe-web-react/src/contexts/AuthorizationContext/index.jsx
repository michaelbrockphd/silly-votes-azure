// Old version taken from SkillBakery.  Retained a second attempt is made with that approach.
/*import authentication from '@kdpw/msal-b2c-react';
import decodeJWT from 'jwt-decode';

class AuthWrapper {
    isLoggedIn() {
        const token = this.getToken();

        return( token ? true : false );
    }

    logout() {
        authentication.signOut();
    }

    getToken() {
        return authentication.getAccessToken();
    }

    currentUser() {
        const decoded = decodeJWT(this.getToken());

        return( {
            email: decoded.emails[ 0 ],
        } );
    }
}*/

// Sourced from: https://dev.to/finiam/predictable-react-authentication-with-the-context-api-g10

import {
    createContext,
    useContext,
    useMemo,
    useState
} from 'react';

import axios from 'axios';

const authStorage = () => {
    return sessionStorage;
};

const getInitialState = () => {
    const token = authStorage().getItem( "authed" );

    return token === "true";
};

const baseUrl = 'http://localhost:9000';
const methodNameLogin = 'login';

const IsAuthenticatedContext = createContext( false );

export function AuthorizationProvider( {children} ) {
    const initial = getInitialState();

    const [isLoggedIn, setIsLoggedIn] = useState(initial);

    async function login() {
        const reqData = {
            email: 'whyMe@example.com'
        };

        const parameters = {
            method: 'post',
            url: `${baseUrl}/${methodNameLogin}`,
            data: reqData
        };

        axios( parameters )
            .then( (rsp) => {
                const authHeaderVal = rsp.headers[ 'authorization' ];

                if( authHeaderVal ) {
                    console.log( `authHead: ${authHeaderVal}` );

                    authStorage().setItem( "authed", "true" );

                    authStorage().setItem( "authHeader", authHeaderVal );

                    setIsLoggedIn(true);
                }
                else {
                    alert( "Login failed, :( " );
                }
            } )
            .catch( (err) => {
                console.log( err );
            } );
    };
    
    async function logout() {
        authStorage().removeItem( "authed" );

        setIsLoggedIn(false);
    };

    function currentUser() {
        return({
            email: "email@example.com"
        });
    };

    function getToken() {
        return authStorage().getItem( "authed" );
    };

    const memoedValue = useMemo(
        () => ({
          isLoggedIn,
          login,
          logout,
          currentUser
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
