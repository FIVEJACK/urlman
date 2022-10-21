import http, { IncomingMessage, ServerResponse } from 'http';
import { appConfig } from 'Config/app';
import url, { parse as parseUrl } from 'url';
import { urlManager } from 'Helpers/url-manager';

const reqListener = async (req: IncomingMessage, res: ServerResponse) => {
  const pathname = url.parse(req.url || '').pathname;

  if (pathname === '/url') {
    const parsedUrl = parseUrl(req.url!, true);
    const urlContent = await urlManager(parsedUrl);

    res.writeHead(urlContent.statusCode, urlContent.getHeader());
    if (urlContent.success) res.end(urlContent?.data?.content);
    else res.end(urlContent?.data?.error);
  } else {
    res.writeHead(404);
    res.end();
  }
};

const server = http.createServer();
server.on('request', async (req, res) => {
  await reqListener(req, res);
});

server.listen(appConfig.httpPort);
// eslint-disable-next-line no-console
console.log(`Server running on port ${appConfig.httpPort}`);

export default server;
