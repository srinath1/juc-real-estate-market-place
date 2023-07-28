import React from "react";

const Footer = () => {
  return (
    <div className="text-center p-4 bg-dark text-light mt-4">
      <h4 className="mt-4">JUC Real Estate Market(Buy/Sell)</h4>
      <h4 className="mt-4">
        &copy;All Rights Reserved {new Date().getFullYear()}
      </h4>
    </div>
  );
};

export default Footer;
