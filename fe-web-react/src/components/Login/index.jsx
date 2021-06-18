// Taken from https://ui.dev/react-router-v4-protected-routes-authentication/

import { Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

import { useAuthorization } from '../../contexts/AuthorizationContext';

const Login = (props) => {
    const {
        login,
        isLoggedIn
    } = useAuthorization();
        
    const { from } = props.location.state
                    || { from: { pathname: '/' } };

    if(isLoggedIn) {
        return <Redirect to={from} />;
    }

    const doLogin = () => {
        login();
    }

    return(
        <Button onClick={doLogin}
                variant="contained"
                color="default"
                size="small">Simulate Log In</Button>
    );
}

export default Login;
