import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import API from "@/components/Services/API";
import { PlusOutlined } from "@ant-design/icons";

const Modals: React.FC = () => {
  // const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [inventoryType, setInventoryType] = useState("in");
  // console.log(inventoryType);
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");
  // const [organization, setOrganization]= useState(0)
  // const [hospital, setHospital]= useState(0)
  // const [donar, setDonar]= useState(0)
  const { user } = useSelector((state: any) => state.auth);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    // console.log(quantity);
    try {
      if (!bloodGroup || !quantity) {
        return alert("Please provide all fields");
      }
      const { data } = await API.post("/inventory/create-inventory", {
        inventoryType,
        bloodGroup,
        quantity,
        email,
        organization: user?._id,
      });
      if (data?.success) {
        alert("New Record Created");
        window.location.reload();
      }
    } catch (error: any) {
      alert(error.response.data.message);
      window.location.reload();
      console.log(error);
    }
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setOpen(false);
    // }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  // console.log(inventoryType);

  return (
    <>
      <h4 className="cursor-pointer my-8" onClick={showModal}>
        <PlusOutlined className="mr-2" />
        Add Inventory
      </h4>
      <Modal
        open={open}
        title="Manage Blood Record"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
          <Button
            key="submit"
            type="primary"
            // loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        {/* <div className="flex"> */}
        {/* <p className="mr-7"></p> */}
        <div className="w-full">
          {/* <form> */}
          <label htmlFor="bloodType" className="mr-3">
            Blood Type:{" "}
          </label>
          <input
            type="radio"
            name="inRadio"
            defaultChecked
            value={"in"}
            onChange={(e) => setInventoryType(e.target.value)}
          />
          <label htmlFor="in" className="mr-3 ml-1">
            IN
          </label>
          <input
            type="radio"
            name="inRadio"
            // defaultChecked
            value={"out"}
            onChange={(e) => setInventoryType(e.target.value)}
          />
          <label htmlFor="out" className="mr-3 ml-1">
            OUT
          </label>
          <br />
          <label htmlFor="bloodGroup" className="">
            Blood Group:
          </label>
          <select
            onChange={(e) => setBloodGroup(e.target.value)}
            className="p-2 rounded-md cursor-pointer w-full my-1"
          >
            <option selected defaultValue={"Select your Blood group"}>
              Select your Blood group
            </option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B-</option>
          </select>
          <br />
          <label htmlFor="donarEmail" className="">
            {inventoryType === "out" ? "Hospital Email: " : "Donar Email:"}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border bg-slate-200 p-1 rounded-md w-full my-1"
          />
          {/* <br /> */}
          <br />
          <label htmlFor="quantity" className="">
            Quantity(ml):
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border bg-slate-200 p-1 rounded-md w-full my-1"
          />
          {/* </form> */}
        </div>
        {/* </div> */}
      </Modal>
    </>
  );
};

export default Modals;
