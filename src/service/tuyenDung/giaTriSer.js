import { https } from '../urlconfig';

export const giaTriService = {
  updateContent: (language, dataUpdate) => {
    let uri = `/tuyen-dung/gia-tri/content?lg=${language}`;
    return https.put(uri, dataUpdate);
  },
  createImgCarousel: (idImg) => {
    let uri = `/tuyen-dung/gia-tri/carousel?idImg=${idImg}`;
    return https.post(uri);
  },
  deleteImgCarousel: (idImg) => {
    let uri = `/tuyen-dung/gia-tri/carousel?idImg=${idImg}`;
    return https.delete(uri);
  },
  updateContentCarousel: (payload, lg) => {
    let uri = `/tuyen-dung/gia-tri/carousel?lg=${lg}`;
    return https.put(uri, payload);
  },
};
