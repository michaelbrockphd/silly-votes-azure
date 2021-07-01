import appHeaderStyles from './AppHeader.module.css';

import { Fragment } from 'react';
import { AppBar, Button, Link, Toolbar, Typography } from '@material-ui/core';

import { useAuthorization } from '../../contexts/AuthorizationContext';

export default function AppHeader() {
    const { OOS_isLoggedIn, signOut } = useAuthorization();
    
    return(
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h4" className={appHeaderStyles.companyTitle}>
                    <Link className={appHeaderStyles.companyTitleLink} href="/campaigns">Silly Votes</Link>
                </Typography>
                
                {OOS_isLoggedIn() &&
                    <Fragment>
                        <Typography className={appHeaderStyles.loggedInUser}>
                            <Link className={appHeaderStyles.loggedInUserLink} href='/profile'>Your Campaigns</Link>
                        </Typography>

                        <Button onClick={signOut} variant="contained" color="default" size="small">Log Out</Button>
                    </Fragment>}

                {!OOS_isLoggedIn() &&
                    <Button href="/profile" variant="contained" color="default" size="small">Log In</Button>}
            </Toolbar>
        </AppBar>
    );
};
