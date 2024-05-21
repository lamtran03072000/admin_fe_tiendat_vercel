import { https } from '../urlconfig';

export const lienHeService = {
  updateLienHe: (data) => {
    let uri = `/lien-he/lien-he`;
    return https.put(uri, data);
  },
  updateZalo: (sdt) => {
    let uri = `/lien-he/zalo?sdt=${sdt}`;
    return https.put(uri);
  },
};
