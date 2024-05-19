import React from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Sidebar from "../Menu/Sidebar";

const WithNav = ({ children }: any) => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex min-h-screen">
        <div className="w-[25%]">
          <Sidebar></Sidebar>
        </div>
        <div className="w-full mx-10">{children}</div>
      </div>
      {/* <div className="min-h-screen">{children}</div> */}
      <Footer></Footer>
    </div>
  );
};

export default WithNav;
