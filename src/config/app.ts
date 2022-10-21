export interface IConfig {
  environment: string;
  server?: string;
  httpPort?: number;
}

const appConfig: IConfig = {
  environment: process.env.ENV || 'development',
  server: process.env.SERVER,
  httpPort: +(process.env.HTTP_PORT || 7000),
};

export { appConfig };
