"use client";
import React, { useEffect, useState } from "react";
import { Button, Modal, Spin } from "antd";
import API from "../Services/API";
import { useSelector } from "react-redux";
import Modals from "../shared/Modal/Modals";
import moment from "moment";
import { useRouter } from "next/navigation";

const App: React.FC = () => {
  const { loading, user } = useSelector((state: any) => state.auth);
  const [data, setData] = useState([]);
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBloodRecords();
  }, []);
  const router = useRouter();

  return (
    <>
      {user?.role === "Admin" && router.push("/admin")}
      {loading ? (
        <Spin></Spin>
      ) : (
        <>
          <Modals></Modals>
          <table className="w-full mx-1">
            <thead>
              <tr>
                <th className="border border-gray-300 text-sm px-10 py-3 text-left text-gray-700 font-bold">
                  Blood Group
                </th>
                <th className="border border-gray-300 text-sm px-10 py-3 text-left text-gray-700 font-bold">
                  Inventory Type
                </th>
                <th className="border border-gray-300 text-sm px-10 py-3 text-left text-gray-700 font-bold">
                  Quantity
                </th>
                <th className="border border-gray-300 text-sm px-10 py-3 text-left text-gray-700 font-bold">
                  Donar Email
                </th>
                <th className="border border-gray-300 text-sm px-10 py-3 text-left text-gray-700 font-bold">
                  Time & Date
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((record: any) => (
                <tr key={record._id}>
                  <td className="border border-gray-300 px-6 py-2">
                    {record.bloodGroup}
                  </td>
                  <td className="border border-gray-300 px-6 py-2">
                    {record.inventoryType}
                  </td>
                  <td className="border border-gray-300 px-6 py-2">
                    {record.quantity} ml
                  </td>
                  <td className="border border-gray-300 px-6 py-2">
                    {record.email}
                  </td>
                  <td className="border border-gray-300 px-6 py-2">
                    {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default App;
