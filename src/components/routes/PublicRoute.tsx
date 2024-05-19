import { useRouter } from "next/navigation";
import React from "react";

const PublicRoute = ({ children }: any) => {
  const router = useRouter();
  const token = window.localStorage.getItem("token");
  if (token) {
    router.push("/");
  } else {
    return children;
  }
};

export default PublicRoute;
