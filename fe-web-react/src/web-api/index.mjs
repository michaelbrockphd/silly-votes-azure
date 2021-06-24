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
}

export default new WebApi();