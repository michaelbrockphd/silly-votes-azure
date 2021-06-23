//import api from '../Api';
//import Auth from '../AuthWrapper';
import axios from 'axios';

//import testData from '../data/testCampaigns.json';

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

    /*getCampaigns() {
        var rtn = new Promise((kept, broken) => {
            setTimeout( () => {
                var rtnRsp = {
                    data: testData
                };

                kept(rtnRsp);
            }, 3000 );
        } );

        return( rtn );
    }*/

    getCampaigns() {
        const parameters = {
            method: 'get',
            url: `${baseUrl}/campaigns`
        };

        return( axios( parameters ) );
    }
}

export default new WebApi();