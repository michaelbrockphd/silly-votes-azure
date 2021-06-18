import { Button } from '@material-ui/core';

import { useAuthorization } from '../../contexts/AuthorizationContext';

const Login = () => {
    const { login } = useAuthorization();
    
    const doLogin = () => {
        login().then( () => {
                    window.location = "/members";
                } );
    }

    return(
        <Button onClick={doLogin}
                variant="contained"
                color="default"
                size="small">Simulate Log In</Button>
    );
}

export default Login;
