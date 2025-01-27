import { getPathRoot } from '../Common/utils/urlUtils';

export type IsBlockActiveArgs = {
  blockPath: string;
  pathname: string;
  isDefaultBlock: boolean;
};

export const isBlockActive = ({
  blockPath,
  isDefaultBlock,
  pathname,
}: IsBlockActiveArgs) => {
  const currentActiveBlock = getPathRoot(pathname);

  if (isDefaultBlock) {
    return currentActiveBlock === '';
  }

  const block = getPathRoot(blockPath);

  return currentActiveBlock === block;
};
