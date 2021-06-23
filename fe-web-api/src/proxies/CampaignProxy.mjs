import { createProxyMiddleware } from 'http-proxy-middleware';

export default function createCampaignProxy( serviceUrl ) {
    const rtnProxy = createProxyMiddleware(
        ['/campaigns' ],
        {
            target: serviceUrl
        }
    );

    return( rtnProxy );
};
