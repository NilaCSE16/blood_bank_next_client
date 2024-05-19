import WithNav from "@/components/Layout/WithNav";
import OrgList from "@/components/Pages/Admin/OrgList";
import React from "react";

const page = () => {
  return (
    <WithNav>
      <OrgList></OrgList>
    </WithNav>
  );
};

export default page;
