import { createProxyMiddleware } from 'http-proxy-middleware';

export default function createAuthorizationProxy() {
    const urlSvcAuth = process.env.BE_AUTH_URL || 'http://localhost:9001';

    const rtnProxy = createProxyMiddleware(
        ['/login' ],
        {
            target: urlSvcAuth
        }
    );

    return( rtnProxy );
};
