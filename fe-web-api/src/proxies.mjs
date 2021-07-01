import { createProxyMiddleware } from 'http-proxy-middleware';

const createProxy = ( targets, serviceUrl ) => {
    const rtnProxy = createProxyMiddleware(
        targets,
        {
            target: serviceUrl
        }
    );

    return( rtnProxy );
};

const createCampaignProxy = (serviceUrl) => {
    const rtnProxy = createProxy( ["/campaigns"], serviceUrl );

    return(rtnProxy);
};

const createUserCampaignProxy = (serviceUrl) => {
    const rtnProxy = createProxy( ["/usercampaigns"], serviceUrl );

    return(rtnProxy);
};

const ProxyFactory = {
    createCampaignProxy: createCampaignProxy,
    createUserCampaignProxy: createUserCampaignProxy
};

export {
    createCampaignProxy,
    createUserCampaignProxy
};

export default ProxyFactory;
