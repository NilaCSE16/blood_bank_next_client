import WithNav from "@/components/Layout/WithNav";
import Organization from "@/components/shared/Dashboard/Organization";
import React from "react";

const page = () => {
  return (
    <>
      <WithNav>
        <Organization></Organization>
      </WithNav>
    </>
  );
};

export default page;
