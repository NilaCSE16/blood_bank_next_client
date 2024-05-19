import WithNav from "@/components/Layout/WithNav";
import HospitalList from "@/components/Pages/Admin/HospitalList";
import React from "react";

const page = () => {
  return (
    <WithNav>
      <HospitalList />
    </WithNav>
  );
};

export default page;
