"use client";
import React from "react";
import {
  UserOutlined,
  HomeOutlined,
  AuditOutlined,
  InboxOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);

  const pathname = usePathname();
  // console.log(pathname);
  // const [selectedItem, setSelectedItem] = useState("");
  // const [collapsed, setCollapsed] = useState(false);

  // const toggleCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };
  // const router = useRouter();
  return (
    <div className="bg-[#001529] min-h-screen flex items-center">
      <div className="w-full">
        {user?.role === "Organization" && (
          <>
            <div
              className={`w-full my-5 ${
                pathname === "/" ? "bg-white text-black py-3" : "text-white"
              }`}
            >
              <Link href={"/"} className="mx-5">
                <HomeOutlined className="mx-2" style={{ fontSize: "23px" }} />
                <span className="text-xl">Inventory</span>
              </Link>
            </div>
            <div
              className={`w-full my-5 ${
                pathname === "/donar"
                  ? "bg-white text-black py-3"
                  : "text-white"
              }`}
            >
              <Link href={"/donar"} className="mx-5">
                <UserOutlined className="mx-2" style={{ fontSize: "23px" }} />
                <span className="text-xl">Donar</span>
              </Link>
            </div>
            <div
              className={`w-full my-5 ${
                pathname === "/hospital"
                  ? "bg-white text-black py-3"
                  : "text-white"
              }`}
            >
              <Link href={"/hospital"} className="mx-5">
                <AuditOutlined className="mx-2" style={{ fontSize: "23px" }} />
                <span className="text-xl">Hospital</span>
              </Link>
            </div>
          </>
        )}
        {user?.role === "Admin" && (
          <>
            <div
              className={`w-full my-5 ${
                pathname === "/donarlist"
                  ? "bg-white text-black py-3"
                  : "text-white"
              }`}
            >
              <Link href={"/donarlist"} className="mx-5">
                <UserOutlined className="mx-2" style={{ fontSize: "23px" }} />
                <span className="text-xl">Donar List</span>
              </Link>
            </div>
            <div
              className={`w-full my-5 ${
                pathname === "/hospitallist"
                  ? "bg-white text-black py-3"
                  : "text-white"
              }`}
            >
              <Link href={"/hospitallist"} className="mx-5">
                <AuditOutlined className="mx-2" style={{ fontSize: "23px" }} />
                <span className="text-xl">Hospital List</span>
              </Link>
            </div>
            <div
              className={`w-full my-5 ${
                pathname === "/orglist"
                  ? "bg-white text-black py-3"
                  : "text-white"
              }`}
            >
              <Link href={"/orglist"} className="mx-5">
                <InboxOutlined className="mx-2" style={{ fontSize: "23px" }} />
                <span className="text-xl">Organization List</span>
              </Link>
            </div>
          </>
        )}
        {(user?.role === "Donar" || user?.role === "Hospital") && (
          <div
            className={`w-full my-5 ${
              pathname === "/organization"
                ? "bg-white text-black py-3"
                : "text-white"
            }`}
          >
            <Link href={"/organization"} className="mx-5">
              <InboxOutlined className="mx-2" style={{ fontSize: "23px" }} />
              <span className="text-xl">Organization</span>
            </Link>
          </div>
        )}
        {user?.role === "Donar" && (
          <div
            className={`w-full my-5 ${
              pathname === "/donation"
                ? "bg-white text-black py-3"
                : "text-white"
            }`}
          >
            <Link href={"/donation"} className="mx-5">
              <UsergroupAddOutlined
                className="mx-2"
                style={{ fontSize: "23px" }}
              />
              <span className="text-xl">Donation</span>
            </Link>
          </div>
        )}
        {user?.role === "Hospital" && (
          <div
            className={`w-full my-5 ${
              pathname === "/consumer"
                ? "bg-white text-black py-3"
                : "text-white"
            }`}
          >
            <Link href={"/consumer"} className="mx-5">
              <TeamOutlined className="mx-2" style={{ fontSize: "23px" }} />
              <span className="text-xl">Consumer</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
