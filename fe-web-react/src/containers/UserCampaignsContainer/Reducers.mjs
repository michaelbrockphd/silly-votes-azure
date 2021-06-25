import Actions from './Actions.mjs';

// Individual reducers for more complex actions.

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

// The main reducer.

const reducer = (state, action) => {
    switch(action.type) {
        case Actions.ADD_CAMPAIGN:
            return reduceAddCampaignDetail(state);

        case Actions.CHANGE_LOADING:
            return { ...state, isLoading: action.value };

        case Actions.CHANGE_CAMPAIGNS:
            return { ...state, campaigns: action.value };

        case Actions.CLOSE_DETAILS:
            return { ...state, showCampaignDetails: false };

        case Actions.EDIT_CAMPAIGN:
            return reduceEditCampaignDetail(state, action.value);

        case Actions.REMOVE_CAMPAIGN:
            return { ...state, campaigns: reduceCampaignRemoval(state.campaigns, action.value) };

        default:
            throw new Error( `${action.type} is not a recognised action.` );
    }
};

export default reducer;
