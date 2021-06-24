import { Fragment } from 'react';

import UserCampaignsContainer from '../../containers/UserCampaignsContainer';

const Profile = () => {
    return(
        <Fragment>
            <h3>Your Campaigns</h3>

            <UserCampaignsContainer />
        </Fragment>
    );
};

export default Profile;
