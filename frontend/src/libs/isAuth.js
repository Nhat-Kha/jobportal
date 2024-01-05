const isAuth = () => {
  return localStorage.getItem("token");
};

export const userType = () => {
  return localStorage.getItem("type");
};

export const getId = () => {
  return localStorage.getItem("id");
};

export default isAuth;
