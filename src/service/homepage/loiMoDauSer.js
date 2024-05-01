import { https } from '../urlconfig';

export const loiMoDauService = {
  updateContent: (language, infoUpdate) => {
    let uri = `/page-home/loi-mo-dau/content?lg=${language}`;
    return https.put(uri, infoUpdate);
  },
};
