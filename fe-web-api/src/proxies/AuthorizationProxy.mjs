import { createProxyMiddleware } from 'http-proxy-middleware';

export default function createAuthorizationProxy( serviceUrl ) {
    const rtnProxy = createProxyMiddleware(
        ['/login' ],
        {
            target: serviceUrl
        }
    );

    return( rtnProxy );
};
