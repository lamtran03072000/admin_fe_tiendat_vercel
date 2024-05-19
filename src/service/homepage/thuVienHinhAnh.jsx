import { https } from '../urlconfig';

export const thuVienHinhAnhService = {
  createImg: (idImg) => {
    let uri = `/page-home/thu-vien-hinh-anh?idImg=${idImg}`;
    return https.post(uri);
  },
  deleteImg: (idImg) => {
    let uri = `/page-home/thu-vien-hinh-anh?idImg=${idImg}`;
    return https.delete(uri);
  },
};
