import { https } from '../urlconfig';

export const CacViTriService = {
  postViTri: (infoViTri) => {
    let uri = `/tuyen-dung/cac-vi-tri`;
    return https.post(uri, infoViTri);
  },
  deleteViTri: (idViTri) => {
    let uri = `/tuyen-dung/cac-vi-tri?id=${idViTri}`;
    return https.delete(uri);
  },
  changeViTri: (infoViTri) => {
    let uri = `/tuyen-dung/cac-vi-tri/change-vi-tri`;
    return https.post(uri, infoViTri);
  },
  updateContent: (lg, id, infoViTri) => {
    let uri = `/tuyen-dung/cac-vi-tri/content?id=${id}&lg=${lg}`;
    return https.put(uri, infoViTri);
  },
};
