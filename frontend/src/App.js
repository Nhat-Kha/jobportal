import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "pages/landingPage/About";
import Home from "pages/landingPage/Home";
import React from "react";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/about" element={<About />} />
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
