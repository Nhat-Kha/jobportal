export const server = "http://localhost:4444/api";

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  uploadCV: `${server}/upload/resume`,
  uploadProfile: `${server}/upload/profile`,
  jobs: `${server}/job`,
  applications: `${server}/application`,
  rating: `${server}/rating`,
  user: `${server}/user`,
  applicants: `${server}/applicants`,
};

export default apiList;
