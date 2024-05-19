import WithNav from "@/components/Layout/WithNav";
import Donar from "@/components/shared/Dashboard/Donar";
import React from "react";

const page = () => {
  return (
    <div>
      <WithNav>
        {/* <h1>Donar page</h1> */}
        <Donar></Donar>
      </WithNav>
    </div>
  );
};

export default page;
