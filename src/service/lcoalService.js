const KEY_STATUS_LOGIN_DAITIENDAT = 'KEY_STATUS_LOGIN_DAITIENDAT';
export const userInfoLocal = {
  set: (dataUser) => {
    let json = JSON.stringify(dataUser);
    localStorage.setItem(KEY_STATUS_LOGIN_DAITIENDAT, json);
  },
  get: () => {
    let jsonUserInfo = localStorage.getItem(KEY_STATUS_LOGIN_DAITIENDAT);
    if (jsonUserInfo != 'undefined') {
      return JSON.parse(jsonUserInfo);
    } else {
      return null;
    }
  },
  remove: () => {
    localStorage.removeItem(KEY_STATUS_LOGIN_DAITIENDAT);
  },
};
