"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import API from "../Services/API";
import { getCurrentUser } from "../Redux/features/auth/authSlice";
import { AppDispatch } from "@/app/(rootLayout)/lib/store";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }: any) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const getUser = async () => {
    try {
      const { data } = await API.get("/auth/current-user");
      //   console.log(data);
      if (data?.success) {
        dispatch(getCurrentUser(data));
      }
    } catch (error) {
      localStorage.clear();
      //   console.log(error);
    }
  };
  // const [token1, setToken1] = useState<string | null>(null);
  useEffect(() => {
    getUser();
    // setToken1(localStorage.getItem("token"));
  });
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      return children;
    } else {
      return router.push("/login");
    }
  }
};

export default PrivateRoute;
