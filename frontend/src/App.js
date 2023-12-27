import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import About from "pages/landingPage/About";
import Home from "pages/landingPage/Home";
import { React, createContext, useState } from "react";
import PrivacyPolicy from "pages/landingPage/PrivacyPolicy";
import Navbar from "components/Navbar";
import InfoBar from "components/InfoBar";
import ScrollToTop from "hooks/ScrollToTop";
import Companies from "pages/landingPage/Companies";
import Footer from "components/Footer";
import SignIn from "pages/landingPage/SignIn/SignIn";
import SignUp from "pages/landingPage/SignUp/SignUp";
// import SignUpApplicant from "pages/landingPage/SignUp/SignUpApplicant";
// import SignUpRecruiter from "pages/landingPage/SignUp/SignUpRecruiter";
import Jobs from "pages/landingPage/Jobs";
import ForRecruiter from "pages/landingPage/For/ForRecruiter";
import ForApplicant from "pages/landingPage/For/ForApplicant";
import useRole from "hooks/useRole";
import Leaderboard from "pages/home/Leaderboard";
import ResetPassword from "pages/landingPage/SignIn/ResetPassword";
import { userType } from "libs/isAuth";
import Referrals from "pages/home/Referrals";
import Settings from "pages/home/Settings";
import isAuth from "libs/isAuth";
import Logout from "pages/landingPage/Logout";
import AdminAddJob from "pages/admin/AdminAddJob";
import OTPInput from "pages/landingPage/SignIn/OTPInput";
import Reset from "pages/landingPage/SignIn/Reset";
import Recovered from "pages/landingPage/SignIn/Recovered";

export const SetPopupContext = createContext();
// export const RecoveryContext = createContext();

// function ApplicantRoute({ component: C, ...props }) {
//   return (
//     <Route
//       {...props}
//       render={(routeProps) =>
//         props.type === "applicant" ? (
//           <C {...routeProps} />
//         ) : (
//           <redirect to="/sign-in" />
//         )
//       }
//     />
//   );
// }

// const ApplicantRoute = ({ component: C, ...props }) => {
//   const auth = isAuth();
//   return auth ? (
//     <redirect to="/sign-in">
//   ) : (
//     <Navigate to="/" />
//   );
// };

export default function App() {
  const type = userType();
  console.log("role:" + type);
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });

  return (
    <Router>
      <SetPopupContext.Provider value={setPopup}>
        <ScrollToTop />
        <InfoBar />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route exact path="/companies" element={<Companies />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/reset-pass" element={<OTPInput />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/reset-recovered" element={<Recovered />} />

          <Route exact path="/referrals" element={<Referrals />} type={type} />
          {/* <Route
            exact
            path="/sign-up/new-applicant"
            element={<SignUpApplicant />}
          />
          <Route
            exact
            path="/sign-up/new-recruiter"
            element={<SignUpRecruiter />}
          /> */}
          <Route exact path="/jobs" element={<Jobs />} />
          <Route exact path="/for-recruiter" element={<ForRecruiter />} />
          <Route exact path="/for-applicant" element={<ForApplicant />} />
          <Route exact path="/leaderboard" element={<Leaderboard />} />
          <Route
            exact
            path="/sign-in/reset-password"
            element={<ResetPassword />}
          />

          {/* <ApplicantRoute
            exact
            path="/applicant/settings"
            element={<Settings />}
          /> */}

          <Route
            exact
            path="/create-new-job"
            element={<AdminAddJob />}
            type={type}
          />

          <Route exact path="/applicant/settings" element={<Settings />} />
          <Route exact path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
      </SetPopupContext.Provider>
    </Router>
  );
}
