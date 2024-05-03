import { https } from '../urlconfig';

export const bannerService = {
  updateContent: (language, infoUpdate) => {
    let uri = `/tuyen-dung/banner-td/content?lg=${language}`;
    return https.put(uri, infoUpdate);
  },
};
