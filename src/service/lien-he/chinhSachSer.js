import { https } from '../urlconfig';

export const chinhSachService = {
  updateChinhSach: (data, lg) => {
    let uri = `/lien-he/chinh-sach?lg=${lg}`;
    return https.put(uri, data);
  },
};
