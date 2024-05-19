import WithNav from "@/components/Layout/WithNav";
import Hospital from "@/components/shared/Dashboard/Hospital";
import React from "react";

const page = () => {
  return (
    <div>
      <WithNav>
        {/* <h1>Hospital</h1> */}
        <Hospital></Hospital>
      </WithNav>
    </div>
  );
};

export default page;
