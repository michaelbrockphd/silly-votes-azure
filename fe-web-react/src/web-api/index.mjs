import axios from 'axios';

const baseUrl = process.env.FE_WEB_API_URL || 'http://localhost:9000';

class WebApi {
    getCampaigns() {
        const parameters = {
            method: 'get',
            url: `${baseUrl}/campaigns`
        };

        return( axios( parameters ) );
    }

    addUserCampaign(authToken, freshCampaign) {
        const reqHeaders = {
            Authorization: authToken
        };

        const parameters = {
            method: 'post',
            url: `${baseUrl}/usercampaigns`,
            headers: reqHeaders,
            data: freshCampaign
        };

        return( axios( parameters ) );
    }

    deleteUserCampaign(authToken, campaign) {
        const reqHeaders = {
            Authorization: authToken
        };

        const parameters = {
            method: 'delete',
            url: `${baseUrl}/usercampaigns/${campaign.id}`,
            headers: reqHeaders,
            data: campaign
        };

        return( axios( parameters ) );
    }

    getUserCampaigns(authToken) {
        const reqHeaders = {
            Authorization: authToken
        };

        const parameters = {
            method: 'get',
            url: `${baseUrl}/usercampaigns`,
            headers: reqHeaders
        };

        return( axios( parameters ) );
    }

    updateUserCampaign(authToken, updateCampaign) {
        const reqHeaders = {
            Authorization: authToken
        };

        const parameters = {
            method: 'put',
            url: `${baseUrl}/usercampaigns/${updateCampaign.id}`,
            headers: reqHeaders,
            data: updateCampaign
        };

        return( axios( parameters ) );
    }
}

export default new WebApi();