"use client";

import React, { useState } from "react";
import {
  AppstoreOutlined,
  BgColorsOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
// import { Menu } from "antd";
import { BiSolidDonateBlood } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

const Navbar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfully");
    router.push("/login");
  };
  const pathname = usePathname();
  return (
    <>
      <nav className="flex bg-indigo-950 py-3 text-white px-16">
        <div className="flex container font-bold text-2xl cursor-pointer text-[#FF0000]">
          <BiSolidDonateBlood
            color="red"
            className="mx-3 -mt-1"
            style={{ fontSize: "36px" }}
          />
          Blood Bank
        </div>
        <ul className="flex w-full justify-end">
          <li className="mx-3">
            <span className="text-xt mt-2 flex">
              <CgProfile className="mx-3" style={{ fontSize: "24px" }} />
              Welcome{" "}
              {user?.name || user?.hospitalName || user?.organizationName}{" "}
              <span className="badge bg-slate-600 px-2 mx-3 rounded-md">
                {user?.role}
              </span>
            </span>
          </li>
          {pathname === "/" ||
          pathname === "/donar" ||
          pathname === "/hospital" ? (
            <li className="mx-3">
              <span className="text-xt mt-2 flex">
                <Link href={"/analytics"}>Analytics</Link>
              </span>
            </li>
          ) : (
            <li className="mx-3">
              <span className="text-xt mt-2 flex">
                <Link href={"/"}>Home</Link>
              </span>
            </li>
          )}
          <li className="mx-3">
            <button
              onClick={handleLogout}
              className="bg-slate-300 text-black px-3 py-2 rounded-md hover:bg-slate-400"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
