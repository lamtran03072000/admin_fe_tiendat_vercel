export const userInfoLocal = {
  set: (dataUser) => {
    let json = JSON.stringify(dataUser);
    localStorage.setItem(USER_INFO, json);
  },
  get: () => {
    let jsonUserInfo = localStorage.getItem(USER_INFO);
    if (jsonUserInfo) {
      return JSON.parse(jsonUserInfo);
    } else {
      return null;
    }
  },
  remove: () => {
    localStorage.removeItem(USER_INFO);
  },
};
