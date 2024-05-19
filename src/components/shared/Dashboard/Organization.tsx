"use client";
import API from "@/components/Services/API";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Organization = () => {
  const [data, setDate] = useState([]);
  const { user } = useSelector((state: any) => state.auth);
  const getOrganization = async () => {
    try {
      if (user?.role === "Donar") {
        const { data } = await API.get("/inventory/get-organizations");
        if (data?.success) {
          setDate(data?.organizations);
        }
      }
      if (user?.role === "Hospital") {
        const { data } = await API.get(
          "/inventory/get-organization-for-hospital"
        );
        if (data?.success) {
          setDate(data?.organizations);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrganization();
  });
  return (
    <div className="w-full">
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
              Address
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
                {record.organizationName}
              </td>
              <td className="border border-gray-300 px-6 py-2">
                {record.email}
              </td>
              <td className="border border-gray-300 px-6 py-2">
                {record.phone}
              </td>
              <td className="border border-gray-300 px-6 py-2">
                {record.address}
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

export default Organization;
