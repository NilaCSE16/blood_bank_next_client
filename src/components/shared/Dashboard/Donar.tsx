"use client";
import WithNav from "@/components/Layout/WithNav";
import API from "@/components/Services/API";
import moment from "moment";
import React, { useEffect, useState } from "react";

const Donar = () => {
  const [data, setDate] = useState([]);
  const getDonar = async () => {
    try {
      const { data } = await API.get("/inventory/get-donar");
      // console.log(data);
      if (data?.success) {
        setDate(data?.donar);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonar();
  }, []);
  return (
    <div>
      <table className="w-full mx-1 my-8">
        <thead>
          <tr>
            <th className="border border-gray-300 text-sm px-10 py-3 text-left text-gray-700 font-bold">
              Name
            </th>
            <th className="border border-gray-300 text-sm px-10 py-3 text-left text-gray-700 font-bold">
              Email
            </th>
            <th className="border border-gray-300 text-sm px-10 py-3 text-left text-gray-700 font-bold">
              Phone
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
                {record.name || record.organizationName + "(ORG)"}
              </td>
              <td className="border border-gray-300 px-6 py-2">
                {record.email}
              </td>
              <td className="border border-gray-300 px-6 py-2">
                {record.phone}
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

export default Donar;
