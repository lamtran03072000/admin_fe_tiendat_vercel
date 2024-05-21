import { https } from '../urlconfig';

export const userService = {
  postLogin: (user) => {
    let uri = `/login`;
    return https.post(uri, user);
  },
};
