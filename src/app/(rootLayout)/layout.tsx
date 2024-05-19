import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "./StoreProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const WithRootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <StoreProvider>
      <ToastContainer />
      <div>{children}</div>
    </StoreProvider>
  );
};

export default WithRootLayout;
