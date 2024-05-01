import { https } from './urlconfig';

export const imgUploadService = {
  postImg: (formData, idImg = 0) => {
    let uri = `/img-upload?idImg=${idImg}`;
    return https.post(uri, formData);
  },
  getImg: (idImg) => {
    let uri = `/img-upload?idImg=${idImg}`;
    return https.get(uri);
  },
};
