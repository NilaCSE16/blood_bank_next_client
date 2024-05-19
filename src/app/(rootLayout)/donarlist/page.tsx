import WithNav from "@/components/Layout/WithNav";
import DonarList from "@/components/Pages/Admin/DonarList";
import React from "react";

const page = () => {
  return (
    <WithNav>
      <DonarList></DonarList>
    </WithNav>
  );
};

export default page;
