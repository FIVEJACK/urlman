export interface IProxyHosts {
  hostnames: string[];
}

const proxyHosts: IProxyHosts = {
  hostnames: process.env.WHITELIST_HOSTNAME?.split(',') || [],
};

export { proxyHosts };
