export const server =
  "https://jobportal-6qtv.onrender.com/api";
  // "http://localhost:5000/api";

const apiList = {
  login: `${server}/auth/login`,
  signup: `${server}/auth/signup`,
  forgot: `${server}/auth/password/forgot`,
  reset: `${server}/auth/password/reset`,
  uploadResume: `${server}/uploadResume/resume`,
  downloadResume: `${server}/download/resume`,
  uploadProfile: `${server}/upload/profile`,
  jobs: `${server}/jobs`,
  updateJob: `${server}/jobs/:id`,
  jobsId: `${server}/jobs/`,
  applications: `${server}/applications`,
  updateApplications: `${server}/applications/:id`,
  rating: `${server}/rating`,
  updateUser: `${server}/user`,
  deleteUser: `${server}/user/deleteUser/:id`,
  user: `${server}/user`,
  users: `${server}/user/all`,
  userId: `${server}/user/:id`,
  applicants: `${server}/applicants`,
  OTP: `${server}/auth/verify_otp`,
  allApplicants: `${server}/user/allApplicant`,
  allRecruiter: `${server}/user/allRecruiter`,
  getIdRecruiter: `${server}/user/allRecruiter/:id`,
  getIdApplicant: `${server}/user/allApplicant/:id`,
};

export default apiList;
