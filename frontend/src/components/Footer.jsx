import React, { useContext } from "react";

const Footer = () => (
  <footer className="bg-gray-50 text-center text-sm py-4 mt-8">
    <div className="container mx-auto">© {new Date().getFullYear()} SkillSwap</div>
  </footer>
);
export default Footer;
