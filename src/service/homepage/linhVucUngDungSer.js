import { https } from '../urlconfig';

export const linhVucUngDungService = {
  updateContent: (language, dataUpdate) => {
    let uri = `/page-home/linh-vuc-ung-dung?lg=${language}`;
    return https.put(uri, dataUpdate);
  },
};
