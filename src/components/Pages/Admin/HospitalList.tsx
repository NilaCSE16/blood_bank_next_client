"use client";
import { useAppDispatch } from "@/app/(rootLayout)/lib/hooks";
import { logoutUser } from "@/components/Redux/features/auth/authSlice";
import API from "@/components/Services/API";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

const HospitalList = () => {
  const [data, setDate] = useState([]);
  const getDonar = async () => {
    try {
      const { data } = await API.get("/admin/hospital-list");
      // console.log(data);
      if (data?.success) {
        setDate(data?.hospitalData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonar();
  }, []);

  const dispatch = useAppDispatch();
  const handleDelete = async (id: any) => {
    try {
      let answer = window.prompt("Are you sure to Delete this donar?", "Sure");
      if (!answer) return;
      const { data } = await API.delete(`/admin/delete-hospital/${id}`);
      dispatch(logoutUser());
      alert(data?.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
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
            <th className="border border-gray-300 text-sm px-10 py-3 text-left text-gray-700 font-bold">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.map((record: any) => (
            <tr key={record._id}>
              <td className="border border-gray-300 px-6 py-2">
                {record.hospitalName}
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
              <td className="border border-gray-300 px-6 py-3">
                <button
                  onClick={() => handleDelete(record._id)}
                  className="btn text-white bg-red-500 mx-4 px-4 py-1 rounded-md"
                >
                  {/* DELETE */}
                  <DeleteOutlined /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HospitalList;
