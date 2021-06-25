import {
    Fragment,
    useEffect,
    useReducer } from 'react';
import { useAuthorization } from '../../contexts/AuthorizationContext';
import CampaignTable, { CampaignTableLoading } from '../../components/CampaignTable';
import CampaignDetailsDialog from '../../components/CampaignDetailsDialog';

import Actions from './Actions.mjs';
import reducer from './Reducers.mjs';
import WebApi from '../../web-api';

const initialState = {
    isLoading: true,
    campaigns: [],
    showCampaignDetails: false,
    isEditingDetails: false,
    campaignDetails: null
};

const UserCampaignsContainer = (props) => {
    const [{
        isLoading,
        campaigns,
        showCampaignDetails,
        isEditingDetails,
        campaignDetails }, dispatch] = useReducer(reducer, initialState);

    const { getToken } = useAuthorization();

    const token = getToken();

    useEffect(() => {
        WebApi.getUserCampaigns( token )
              .then((response) => {
                    dispatch({
                        type: Actions.CHANGE_CAMPAIGNS,
                        value: response.data
                    });

                    dispatch({
                        type: Actions.CHANGE_LOADING,
                        value: false
                    });
              })
              .catch((err) => {
                  console.log(err);
              });
    }, []);

    const addCampaign = () => {
        dispatch({
            type: Actions.ADD_CAMPAIGN
        });
    };

    const editCampaign = (campaign) => {
        dispatch({
            type: Actions.EDIT_CAMPAIGN,
            value: campaign
        });
    };

    const deleteCampaign = (campaign) => {
        dispatch({
            type: Actions.REMOVE_CAMPAIGN,
            value: campaign
        });
    };

    const closeDetails = () => {
        dispatch({
            type: Actions.CLOSE_DETAILS
        });
    };

    return(
        <Fragment>
            {isLoading && 
                <CampaignTableLoading />}

            {!isLoading &&
                <CampaignTable
                    campaigns={campaigns}
                    canModify={true}
                    addCampaign={addCampaign}
                    editCampaign={editCampaign}
                    deleteCampaign={deleteCampaign} />}

            <CampaignDetailsDialog
                data={campaignDetails}
                isOpen={showCampaignDetails}
                isEditing={isEditingDetails}
                onClose={closeDetails}
                onCancel={closeDetails} />
        </Fragment>
    );
};

export default UserCampaignsContainer;
