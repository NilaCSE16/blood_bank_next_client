"use client";
import API from "@/components/Services/API";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Consumer = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [data, setDate] = useState([]);
  const getDonar = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "out",
          hospital: user._id,
        },
      });
      //   console.log(data);
      if (data?.success) {
        setDate(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonar();
  });
  return (
    <div>
      <table className="w-full mx-1 my-8">
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
              Email
            </th>
            <th className="border border-gray-300 text-sm px-10 py-3 text-left text-gray-700 font-bold">
              Date
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
    </div>
  );
};

export default Consumer;
