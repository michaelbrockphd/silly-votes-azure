import axios from 'axios';

const baseUrl = process.env.FE_WEB_API_URL || 'http://localhost:9000';

class WebApi {
    /*getCampaigns() {
        const subKey = 'dcbb0f5bdaf84f4e90023f2174373b5b';

        const reqUrl = "/GetCampaigns?subscription-key="+ subKey;

        return(
            api({
                method: "get",
                url: reqUrl,
                crossdomain: true,
                headers: {
                    Authorization: Auth.getToken()
                }
            })
        );
    }*/

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
            url: `${baseUrl}/usercampaigns/${campaign._id}`,
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
            url: `${baseUrl}/usercampaigns/${updateCampaign._id}`,
            headers: reqHeaders,
            data: updateCampaign
        };

        return( axios( parameters ) );
    }
}

export default new WebApi();