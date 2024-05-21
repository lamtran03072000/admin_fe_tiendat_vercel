import { https } from '../urlconfig';

export const giaTriService = {
  updateContent: (language, dataUpdate) => {
    let uri = `/tuyen-dung/gia-tri/content?lg=${language}`;
    return https.put(uri, dataUpdate);
  },
};
