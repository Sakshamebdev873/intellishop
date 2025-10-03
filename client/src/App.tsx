import React from "react";
import Homepage from "./pages/HomePage";
import { Route, Routes, useLocation } from "react-router";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
      </Routes>
    </AnimatePresence>
  );
};

export default App;
