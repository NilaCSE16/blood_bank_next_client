"use client";
import API from "@/components/Services/API";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Card, Col, Row } from "antd";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#581845",
    "#FF5733",
    "#9F3620",
    "#FF8166",
    "#9F756C",
    "#cc00ff",
    "#900C3F",
    "#FFC300",
  ];
  // get-recent-inventory
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("analytics/bloodGroup-data");
      //   console.log(data);
      if (data?.success) {
        setData(data.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBloodGroupData();
    getBloodRecords();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen m-10">
        <Row gutter={16}>
          {data?.map((record: any, index) => (
            <Col key={index} span={6} className="my-5">
              <Card
                title={
                  <span className="font-bold text-xl flex justify-center">
                    {record.bloodGroup}
                  </span>
                }
                bordered={false}
                className=""
                style={{ backgroundColor: `${colors[index]}` }}
              >
                <div className="mb-8">
                  <p>
                    Total In: <b>{record.totalIn} ml</b>
                  </p>
                  <p>
                    Total Out: <b>{record.totalOut} ml</b>
                  </p>
                </div>
                {/* <div className="bg-black text-white text-center">
                  Total Available: <b>{record.availableBlood}</b>
                </div> */}
                <Card.Meta
                  title={
                    <span className="text-white flex justify-center">
                      Total Available:{" "}
                      <b className="ml-2">{record.availableBlood} ml</b>
                    </span>
                  }
                  className="text-sm rounded-md bg-slate-700 py-4 pl-5 text-gray-600 border-t border-gray-200"
                />
              </Card>
            </Col>
          ))}
        </Row>
        <div>
          <h1 className="font-bold text-2xl text-center mb-5">
            Recent Blood Transaction
          </h1>
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
              {inventoryData?.map((record: any) => (
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
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Analytics;
