import fetch from 'node-fetch';
import { UrlWithParsedQuery, parse as parseUrl } from 'url';
import ReturnObject from 'Helpers/return-object';

// Fetch url content and return the content
export const urlManager = async (parsedUrl: UrlWithParsedQuery) => {
  const toReturn = new ReturnObject;
  toReturn.setCSP('default-src *;');
  const redirectUrl: any = parsedUrl?.query?.u || '';
  const isValidUrl = (redirectUrl.indexOf('http://') === 0 || redirectUrl.indexOf('https://') === 0);
  const proxyHosts = ['analytics.tiktok.com', 'connect.facebook.net'];
  const hostname = parseUrl(redirectUrl).hostname ?? '';

  if (isValidUrl && proxyHosts.indexOf(hostname) >= 0) {
    try {
      const urlResponse = await fetch(redirectUrl as string);
      const content = await urlResponse.text();
      const contentType = urlResponse.headers.get('content-type') || 'application/javascript; charset=utf-8';

      toReturn.setData({ content });
      toReturn.setContentType(contentType);
    } catch (err: any) {
      toReturn.setToError();
      toReturn.setData({ error: err.toString() });
    }
  } else {
    toReturn.setToFailed();
    toReturn.setData({ error: 'Invalid URL, input must be using absolute url' });
  }

  return toReturn;
};
