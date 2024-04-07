import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "pages/landingPage/AboutUs/About";
import Home from "pages/landingPage/Home";
import { React, createContext, useEffect, useState } from "react";
import PrivacyPolicy from "pages/landingPage/AboutUs/PrivacyPolicy";
import Navbar from "components/Navbar";
import InfoBar from "components/InfoBar";
import ScrollToTop from "hooks/ScrollToTop";
import Companies from "pages/landingPage/Companies";
import Footer from "components/Footer";
import SignIn from "pages/landingPage/SignIn/SignIn";
import SignUp from "pages/landingPage/SignUp/SignUp";
import Jobs from "pages/landingPage/Jobs";
import ForRecruiter from "pages/landingPage/For/ForRecruiter";
import ForApplicant from "pages/landingPage/For/ForApplicant";
import Leaderboard from "pages/home/Leaderboard";
import ResetPassword from "pages/landingPage/SignIn/ResetPassword";
import { userType } from "libs/isAuth";
import Referrals from "pages/home/Referrals";
import Settings from "pages/home/Settings";
import Logout from "pages/landingPage/Logout";
import AdminAddJob from "pages/admin/AdminAddJob";
import Recovered from "pages/landingPage/SignIn/EmailVerify/Recovered";
import { Reset } from "pages/landingPage/SignIn/Reset";
import Job from "pages/landingPage/Job";
import Refer from "pages/landingPage/Refer";
import AdminJobs from "pages/admin/AdminJobs";
import AdminSettings from "pages/admin/AdminSettings";
import CookiePolicy from "pages/landingPage/AboutUs/CookiePolicy";
import AdminJob from "pages/admin/AdminJob";
import TalentPool from "pages/admin/TalentPool";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfoRecruiter from "pages/landingPage/InfoRecruiter";
import { Dashboard } from "pages/Admin1/Dashboard";
import BlogHome from "components/blog/home-blog";
import DetailNews from "components/blog/body-news/DetailNews";

export const SetPopupContext = createContext();

export default function App() {
  const type = userType();
  console.log("type: " + type);
  const [popup, setPopup] = useState({
    open: false,
    icon: "",
    message: "",
  });

  useEffect(() => {
    if (popup.open) {
      toast[popup.icon](popup.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide,
      });

      setPopup({
        ...popup,
        open: false,
      });
    }
  }, [popup.open, popup.icon, popup.message, popup]);

  return (
    <SetPopupContext.Provider value={setPopup}>
      <Router>
        <ScrollToTop />
        <InfoBar />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route exact path="/cookie-policy" element={<CookiePolicy />} />
          <Route exact path="/companies" element={<Companies />} />
          <Route exact path="/companies/:id" element={<InfoRecruiter />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/sign-in" element={<SignIn />} />
          <Route exact path="/password/reset/:token" element={<Reset />} />
          <Route exact path="/reset-recovered" element={<Recovered />} />
          <Route
            exact
            path="/referrals"
            element={<Referrals />}
            type={type === "applicant"}
          />
          <Route exact path="/jobs" element={<Jobs />} />
          <Route exact path="/for-recruiter" element={<ForRecruiter />} />
          <Route exact path="/for-applicant" element={<ForApplicant />} />
          <Route exact path="/leaderboard" element={<Leaderboard />} />
          <Route exact path="/jobs/:id" element={<Job />} />
          <Route exact path="/jobs/:id/refer" element={<Refer />} />
          <Route
            exact
            path="/sign-in/forgot-password"
            element={<ResetPassword />}
          />
          <Route
            exact
            path="/dashboard/*"
            element={<Dashboard />}
            type={type}
          />
          <Route
            exact
            path="/admin"
            element={<AdminJobs />}
            type={type === "recruiter"}
          />
          <Route
            exact
            path="/admin/:id"
            element={<AdminJob />}
            type={type === "recruiter"}
          />
          <Route
            exact
            path="/create-new-job"
            element={<AdminAddJob />}
            type={type}
          />
          <Route
            exact
            path="/talent-pool"
            element={<TalentPool />}
            type={type}
          />

          <Route exact path="/applicant/settings" element={<Settings />} />
          <Route exact path="/admin/settings" element={<AdminSettings />} />
          <Route exact path="/logout" element={<Logout />} />

          <Route exact path="/blog/*" element={<BlogHome />} />
          <Route exact path="/blog/news" />
          <Route exact path="/blog/news/:id" element={<DetailNews />} />
          <Route exact path="/blog/programming-language" />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer limit={2} autoClose={2000} />
    </SetPopupContext.Provider>
  );
}
