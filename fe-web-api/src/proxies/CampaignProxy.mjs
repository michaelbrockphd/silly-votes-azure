import { createProxyMiddleware } from 'http-proxy-middleware';

export default function createCampaignProxy() {
    const urlSvcCampaigns = process.env.BE_CAMPAIGNS_URL || 'http://localhost:9002';

    const rtnProxy = createProxyMiddleware(
        ['/campaigns' ],
        {
            target: urlSvcCampaigns
        }
    );

        return( rtnProxy );
};
