import { https } from '../urlconfig';

export const numberService = {
  updateContent: (language, dataNumber) => {
    let uri = `/page-home/number?lg=${language}`;
    return https.put(uri, dataNumber);
  },
};
