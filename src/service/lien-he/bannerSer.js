import { https } from '../urlconfig';

export const bannerService = {
  updateBanner: (data, lg) => {
    let uri = `/lien-he/banner?lg=${lg}`;
    return https.put(uri, data);
  },
};
