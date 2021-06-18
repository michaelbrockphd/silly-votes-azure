import appHeaderStyles from './AppHeader.module.css';

import { Fragment } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

import { useAuthorization } from '../../contexts/AuthorizationContext';

export default function AppHeader() {
    const { isLoggedIn, currentUser, logout } = useAuthorization();
    
    return(
        <AppBar position="static">
            <Toolbar>
                <Typography className={appHeaderStyles.companyTitle}>Silly Votes</Typography>
                
                {isLoggedIn &&
                    <Fragment>
                        <a href='/profile'>
                            <Typography className={appHeaderStyles.loggedInUser}>{currentUser().email}</Typography>
                        </a>

                        <Button onClick={logout} variant="contained" color="default" size="small">Log Out</Button>
                    </Fragment>}

                {!isLoggedIn &&
                    <Button href="/login" variant="contained" color="default" size="small">Log In</Button>}
            </Toolbar>
        </AppBar>
    );
};
