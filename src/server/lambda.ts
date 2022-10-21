import { parse as parseUrl } from 'url';
import { urlManager } from 'Helpers/url-manager';
import type { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

export const server = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {
  const parsedUrl = parseUrl(`/?${event.rawQueryString}`!, true);
  const urlContent = await urlManager(parsedUrl);
  const toReturn = { statusCode: urlContent.statusCode,
    body: urlContent.success ? urlContent?.data?.content : urlContent?.data?.error,
    isBase64Encoded: false,
    headers: urlContent.getHeader() };

  return toReturn;
};

export default server;
