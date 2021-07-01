// Sourced from below.
// https://ui.dev/react-router-v5-protected-routes-authentication/

import { Route } from 'react-router-dom';

import { useAuthorization } from '../../contexts/AuthorizationContext';

const AuthenticatedRoute = ( { path, component, ...rest } ) => {
    const { required } = useAuthorization();

    return(
        <Route exact path={path} component={required(component)} />
    );
}

export default AuthenticatedRoute;
