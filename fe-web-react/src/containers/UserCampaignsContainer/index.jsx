import {
    Fragment,
    useEffect,
    useReducer } from 'react';
import { useAuthorization } from '../../contexts/AuthorizationContext';
import CampaignTable, { CampaignTableLoading } from '../../components/CampaignTable';
import CampaignDetailsDialog from '../../components/CampaignDetailsDialog';

import WebApi from '../../web-api';

const ACTION_ADD_CAMPAIGN = "ADD_CAMPAIGN";
const ACTION_CHANGE_CAMPAIGNS = "CHANGE_CAMPAIGNS";
const ACTION_CHANGE_LOADING = "CHANGE_LOADING";
const ACTION_CLOSE_DETAILS = "CLOSE_DETAILS";
const ACTION_EDIT_CAMPAIGN = "EDIT_CAMPAIGN";
const ACTION_REMOVE_CAMPAIGN = "REMOVE_CAMPAIGN";

const reduceCampaignRemoval = (campaigns, target) => {
    // TODO: Update the WebApi class to actually call the microservice.
    const rtn = campaigns.filter( c => c._id !== target._id );

    return( rtn );
};

const reduceAddCampaignDetail = (state, campaign) => {
    var fresh = {
        _id: -1,
        title: null,
        poolSize: 0,
        choices: ['','']
    };

    var rtn = {
        ...state,
        isEditingDetails: false,
        campaignDetails: fresh,
        showCampaignDetails: true
    };

    return( rtn );
};

const reduceEditCampaignDetail = (state, campaign) => {
    // Note: if a deep clone is needed, it is suggested to simply serialize and deserialize via JSON.
    //
    // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript/122704#122704

    var clone = { ...campaign };

    var rtn = {
        ...state,
        isEditingDetails: true,
        campaignDetails: clone,
        showCampaignDetails: true
    };

    return( rtn );
};

const reducer = (state, action) => {
    switch(action.type) {
        case ACTION_ADD_CAMPAIGN:
            return reduceAddCampaignDetail(state);

        case ACTION_CHANGE_LOADING:
            return { ...state, isLoading: action.value };

        case ACTION_CHANGE_CAMPAIGNS:
            return { ...state, campaigns: action.value };

        case ACTION_CLOSE_DETAILS:
            return { ...state, showCampaignDetails: false };

        case ACTION_EDIT_CAMPAIGN:
            return reduceEditCampaignDetail(state, action.value);

        case ACTION_REMOVE_CAMPAIGN:
            return { ...state, campaigns: reduceCampaignRemoval(state.campaigns, action.value) };

        default:
            throw new Error( `${action.type} is not a recognised action.` );
    }
};

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
        dispatch({
            type: ACTION_ADD_CAMPAIGN
        });
    };

    const editCampaign = (campaign) => {
        dispatch({
            type: ACTION_EDIT_CAMPAIGN,
            value: campaign
        });
    };

    const deleteCampaign = (campaign) => {
        dispatch({
            type: ACTION_REMOVE_CAMPAIGN,
            value: campaign
        });
    };

    const closeDetails = () => {
        dispatch({
            type: ACTION_CLOSE_DETAILS
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