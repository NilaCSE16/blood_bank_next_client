import WithNav from "@/components/Layout/WithNav";
import AdminHome from "@/components/Pages/Admin/AdminHome";
import React from "react";

const page = () => {
  return (
    <WithNav>
      <AdminHome></AdminHome>
    </WithNav>
  );
};

export default page;
