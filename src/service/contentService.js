import { https } from './urlconfig';

export const contentService = {
  getContentFull: () => {
    let uri = `/content-full`;
    return https.get(uri);
  },
};
