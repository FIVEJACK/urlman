import fetch from 'node-fetch';
import { UrlWithParsedQuery } from 'url';
import ReturnObject from 'Helpers/return-object';

// Fetch url content and return the content
export const urlManager = async (parsedUrl: UrlWithParsedQuery) => {
  const toReturn = new ReturnObject;
  toReturn.setCSP('default-src *;');
  const redirectUrl = parsedUrl?.query?.u || '';
  const isValidUrl = (redirectUrl.indexOf('http://') === 0 || redirectUrl.indexOf('https://') === 0);

  if (isValidUrl) {
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
