import React from "react";
import Register from "@/components/Register";
import WithoutNav from "@/components/Layout/WithoutNav";

const page = () => {
  return (
    <WithoutNav>
      <Register></Register>
    </WithoutNav>
  );
};

export default page;
