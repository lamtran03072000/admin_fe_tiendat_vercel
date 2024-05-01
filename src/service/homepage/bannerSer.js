import { https } from '../urlconfig';

export const bannerService = {
  updateContent: (language, infoUpdate) => {
    let uri = `/page-home/banner/content?lg=${language}`;
    return https.put(uri, infoUpdate);
  },
  updateContent2: (language, infoUpdate) => {
    let uri = `/page-home/banner/content2?lg=${language}`;
    return https.put(uri, infoUpdate);
  },
};
