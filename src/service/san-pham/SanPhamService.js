import { https } from '../urlconfig';

export const SanPhamService = {
  updateContent: (language, infoUpdate) => {
    let uri = `/tuyen-dung/tai-sao-lam-viec/content?lg=${language}`;
    return https.put(uri, infoUpdate);
  },
};
