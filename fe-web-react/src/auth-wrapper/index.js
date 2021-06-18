// Tutorial calls this class Auth, but I'm calling it AuthWrapper
// as that is what is happening - it is abstracting what authentication
// library is being used.
//
// It is easy enough to give it another name during importation.

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
}

export default new AuthWrapper();*/

class AuthWrapper {
    authStorage() {
        return sessionStorage;
    }

    isLoggedIn() {
        const token = this.authStorage().getItem( "authed" );

        return( token === "true" );
    }

    async login() {
        this.authStorage().setItem( "authed", "true" );
    }

    async logout() {
        this.authStorage().removeItem( "authed" );

        window.location = '/';
    }

    getToken() {
        return "token";
    }

    currentUser() {
        return( {
            email: "email@example.org"
        } );
    }
}

export default new AuthWrapper();
