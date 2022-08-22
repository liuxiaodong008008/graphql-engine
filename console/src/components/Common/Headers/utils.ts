import { Header as HeaderClient, defaultHeader } from './Headers';
import { ServerHeader } from '../../../metadata/types';

export const transformHeaders = (headers_?: HeaderClient[]) => {
  const headers = headers_ || [];
  return headers
    .map(h => {
      const transformedHeader: ServerHeader = {
        name: h.name,
      };
      if (h.type === 'static') {
        transformedHeader.value = h.value;
      } 
      else if (h.type === 'header') {
        transformedHeader.value_from_header = h.value;
      } 
      else {
        transformedHeader.value_from_env = h.value;
      }
      return transformedHeader;
    })
    .filter(h => !!h.name && (!!h.value || !!h.value_from_env || !!h.value_from_header));
};

export const addPlaceholderHeader = (newHeaders: HeaderClient[]) => {
  if (newHeaders.length) {
    const lastHeader = newHeaders[newHeaders.length - 1];
    if (lastHeader.name && lastHeader.value) {
      newHeaders.push(defaultHeader);
    }
  } else {
    newHeaders.push(defaultHeader);
  }
  return newHeaders;
};

export const parseServerHeaders = (headers: ServerHeader[] = []) => {
  return addPlaceholderHeader(
    headers.map(h => {
      const parsedHeader: HeaderClient = {
        name: h.name,
        value: h.value || '',
        type: 'static',
      };
      if (h.value_from_env) {
        parsedHeader.value = h.value_from_env;
        parsedHeader.type = 'env';
      }
      if (h.value_from_header) {
        parsedHeader.value = h.value_from_header;
        parsedHeader.type = 'header';
      }
      return parsedHeader;
    })
  );
};
