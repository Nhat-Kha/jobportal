import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "pages/landingPage/About";
import Home from "pages/landingPage/Home";
import React from "react";
import PrivacyPolicy from "pages/landingPage/PrivacyPolicy";
import { Navbar } from "components/Navbar";
import InfoBar from "components/InfoBar";
import ScrollToTop from "hooks/ScrollToTop";
import Companies from "pages/landingPage/Companies";
import Footer from "components/Footer";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <InfoBar />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route exact path="/companies" element={<Companies />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}
