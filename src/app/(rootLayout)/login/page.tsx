import React from "react";

import Login from "@/components/Login";
import WithoutNav from "@/components/Layout/WithoutNav";

const page: React.FC = () => {
  return (
    <WithoutNav>
      <Login></Login>
    </WithoutNav>
  );
};

export default page;
