import WithNav from "@/components/Layout/WithNav";
import Consumer from "@/components/shared/Dashboard/Consumer";
import React from "react";

const page = () => {
  return (
    <WithNav>
      <Consumer></Consumer>
    </WithNav>
  );
};

export default page;
