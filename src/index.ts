require('@/bootstrap');

import { appConfig } from 'Config/app';
// Init App Server
let appServer: any;
if (appConfig.server === 'lambda') {
  const { server } = require('Server/lambda');
  appServer = server;
  exports.handler = appServer;
} else {
  appServer = require('Server/http-server');
}

export default appServer;
