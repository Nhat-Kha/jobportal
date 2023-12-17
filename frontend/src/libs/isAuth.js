const isAuth = () => {
  return localStorage.getItem("token");
};

const userType = () => {
  return localStorage.getItem("type");
};

export default { isAuth, userType };
