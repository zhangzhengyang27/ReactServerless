export const setLoginData = (token, tokenExpiredAt, photo) => {
  window.localStorage.token = token;
  window.localStorage.tokenExpiredAt = tokenExpiredAt;
  window.localStorage.photo = photo;
}

export const cleanLoginData = () => {
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('tokenExpiredAt');
  window.localStorage.removeItem('photo');
}

export const getLoginStatus = () => {
  let login = false;
  const { token, tokenExpiredAt } = window.localStorage;
  const currentTime = (new Date()).getTime();
  const expireTime = (new Date(tokenExpiredAt)).getTime();
  if(token && (currentTime <= expireTime)) {
    login = true;
  }
  if(!login) {
    cleanLoginData();
  }
  return login;
}