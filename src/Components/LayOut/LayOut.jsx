import React from "react";
import Header from "../Header/Header";
import LowerHeader from "../Header/LowerHeader";

function LayOut({ children }) {
  return (
    <div className="Layout">
      <Header />
      <LowerHeader />
      {children}
    </div>
  );
}
export default LayOut;