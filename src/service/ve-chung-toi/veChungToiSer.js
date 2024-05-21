import { https } from '../urlconfig';

export const veChungToiService = {
  updateBanner: (data, lg) => {
    let uri = `/page-about/banner?lg=${lg}`;
    return https.put(uri, data);
  },
  updateDes: (data, lg) => {
    let uri = `/page-about/des?lg=${lg}`;
    return https.put(uri, data);
  },
  updateCoreValue: (data, lg) => {
    let uri = `/page-about/core-value?lg=${lg}`;
    return https.put(uri, data);
  },
};
