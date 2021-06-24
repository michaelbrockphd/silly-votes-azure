import {
    Fragment,
    useEffect,
    useReducer } from 'react';
import { useAuthorization } from '../../contexts/AuthorizationContext';
import CampaignTable, { CampaignTableLoading } from '../../components/CampaignTable';

import WebApi from '../../web-api';

const ACTION_ADD_CAMPAIGN = "ADD_CAMPAIGN";
const ACTION_CHANGE_CAMPAIGNS = "CHANGE_CAMPAIGNS";
const ACTION_CHANGE_LOADING = "CHANGE_LOADING";
const ACTION_REMOVE_CAMPAIGN = "REMOVE_CAMPAIGN";

const reduceCampaignRemoval = (campaigns, target) => {
    // TODO: Update the WebApi class to actually call the microservice.
    const rtn = campaigns.filter( c => c._id !== target.id );

    return( rtn );
};

const userCampaignReducer = (state, action) => {
    switch(action.type) {
        case ACTION_CHANGE_LOADING:
            return { ...state, isLoading: action.value };

        case ACTION_CHANGE_CAMPAIGNS:
            return { ...state, campaigns: action.value };

        case ACTION_REMOVE_CAMPAIGN:
            return { ...state, campaigns: reduceCampaignRemoval(state.campaigns, action.value) };

        default:
            throw new Error( `${action.type} is not a recognised action.` );
    }
};

const initialState = {
    isLoading: TextTrackCueList,
    campaigns: []
};

const UserCampaignsContainer = (props) => {
    const [{ isLoading, campaigns }, dispatch] = useReducer(userCampaignReducer, initialState);

    const { getToken } = useAuthorization();

    const token = getToken();

    useEffect(() => {
        WebApi.getUserCampaigns( token )
              .then((response) => {
                    dispatch({
                        type: ACTION_CHANGE_CAMPAIGNS,
                        value: response.data
                    });

                    dispatch({
                        type: ACTION_CHANGE_LOADING,
                        value: false
                    });
              })
              .catch((err) => {
                  console.log(err);
              });
    }, []);

    const addCampaign = () => {
        alert( "add campaign" );
    };

    const editCampaign = (campaign) => {
        alert( "Sorry, not implemented yet." );
    };

    const deleteCampaign = (campaign) => {
        alert( "delete campaign" );
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
        </Fragment>
    );
};

export default UserCampaignsContainer;