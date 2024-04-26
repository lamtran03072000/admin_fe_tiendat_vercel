import { https } from './urlconfig';

export const mailService = {
  getMails: () => {
    let uri = `/mailer`;
    return https.get(uri);
  },
  putCheckMail: (idMail) => {
    let uri = `/mailer/checkMail?id=${idMail}`;
    return https.put(uri);
  },
  deleteMail: (idMail) => {
    let uri = `/mailer/delete-mail?id=${idMail}`;
    return https.delete(uri);
  },
};
