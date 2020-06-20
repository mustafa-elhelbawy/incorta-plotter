
import React from "react";
import "./loader.scss";

const Loader = () => {
  return (
    <div className="spinnerContainer d-flex justify-content-center align-items-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;