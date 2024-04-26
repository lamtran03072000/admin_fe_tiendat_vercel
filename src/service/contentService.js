import { https } from './urlconfig';

export const contentService = {
  getContent: (language) => {
    let uri = `/content?lg=${language}`;
    return https.get(uri);
  },
};
