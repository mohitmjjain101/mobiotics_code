const TOKENID = 'userid';
const TOKENEMAIL = 'email';
const admin = 'flag';
export const login = (id, email) => {
  
  localStorage.setItem(TOKENID, id);
  localStorage.setItem(TOKENEMAIL, email);
  return true;
};

export const logout = () => {
  localStorage.removeItem(TOKENID);
  localStorage.removeItem(TOKENEMAIL);
 
};
export const isLogin = () => {
  if (localStorage.getItem(TOKENID) && localStorage.getItem(TOKENEMAIL)) {
    return true;
  }
  return false;
};

export const whoLoggedIn = () => {
  return localStorage.getItem(TOKENID);
};
