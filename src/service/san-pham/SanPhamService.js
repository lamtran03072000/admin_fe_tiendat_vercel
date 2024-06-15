import { https } from '../urlconfig';

export const SanPhamService = {
  createDssp: (data) => {
    let uri = `/san-pham`;
    return https.post(uri, data);
  },
  getDssp: (idDssp) => {
    let uri = `/san-pham?idDssp=${idDssp}`;
    return https.get(uri);
  },
  updateDssp: (lg, idDssp, dataUpdate) => {
    let uri = `/san-pham?idDssp=${idDssp}&lg=${lg}`;
    return https.put(uri, dataUpdate);
  },
  deleteDssp: (id) => {
    let uri = `/san-pham?id=${id}`;
    return https.delete(uri);
  },
  deleteSp: (id) => {
    let uri = `/san-pham/sp?id=${id}`;
    return https.delete(uri);
  },
  postSp: (idDssp, dataSp) => {
    let uri = `/san-pham/sp?idDssp=${idDssp}`;
    return https.post(uri, dataSp);
  },
  getSp: (idSp) => {
    let uri = `/san-pham/sp?idSp=${idSp}`;
    return https.get(uri);
  },
  updateSp: (idSp, lg, dataSp) => {
    let uri = `/san-pham/sp?idSp=${idSp}&lg=${lg}`;
    return https.put(uri, dataSp);
  },
  updateBanner: (data, lg) => {
    let uri = `/san-pham/banner?lg=${lg}`;
    return https.put(uri, data);
  },
  deleteImgDesSp: (idImg, idSp) => {
    let uri = `/san-pham/imgDes?idImg=${idImg}&idSp=${idSp}`;
    return https.delete(uri);
  },
  postImgDesSp: (data, idSp) => {
    let uri = `/san-pham/imgDes?idSp=${idSp}`;
    return https.post(uri, data);
  },
  updateImgDesSp: (data, idSp, idImg) => {
    let uri = `/san-pham/imgDes?idSp=${idSp}&idImg=${idImg}`;
    return https.put(uri, data);
  },
};
