"use client";
import React, { useState } from "react";

import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Radio, Spin } from "antd";
import Image from "next/image";
import banner1 from "../../public/assets/bannar2.jpg";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/(rootLayout)/lib/hooks";
import { createUser } from "./Redux/features/auth/authSlice";
import { useSelector } from "react-redux";

interface RadioOption {
  value: string;
  label: string;
}

// type FieldType = {
//   role?: string;
//   name?: string;
//   email?: string;
//   password?: string;
//   remember?: string;
//   organizationName?: string;
//   hospitalName?: string;
//   website?: string;
//   address?: string;
//   phone?: string;
// };
interface RCredential {
  role: string;
  email: string;
  password: string;
  organizationName?: string;
  hospitalName?: string;
  website: string;
  address: string;
  phone: string;
  name?: string;
}

const Register: React.FC<FormProps<RCredential>> = () => {
  const { isLoading } = useSelector((state: any) => state.auth);
  const dispatch = useAppDispatch();
  const options: RadioOption[] = [
    { value: "Admin", label: "Admin" },
    { value: "Organization", label: "Organization" },
    { value: "Donar", label: "Donar" },
    { value: "Hospital", label: "Hospital" },
    // ... add more options
  ];
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const handleSubmit = async (values: RCredential) => {
    setFormData(values);
    // console.log("Success:", values);
    const {
      role,
      name,
      organizationName,
      hospitalName,
      email,
      password,
      website,
      address,
      phone,
    } = values;
    // console.log(organizationName);
    dispatch(
      createUser({
        role,
        name,
        organizationName,
        hospitalName,
        email,
        password,
        website,
        address,
        phone,
      })
    );
  };

  // const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
  //   errorInfo
  // ) => {
  //   alert("Please enter the required field");
  //   // console.log("Failed:", errorInfo);
  // };
  const [role, setRole] = useState("Donar");
  //   console.log(role);
  return (
    <>
      {isLoading ? (
        <Spin className=" flex w-full min-h-screen justify-center items-center" />
      ) : (
        <div className="flex bg-white w-full">
          <div className="w-[55%] h-full">
            <Image
              src={banner1}
              alt=""
              priority
              height={0}
              width={0}
              style={{ width: "full", height: "770px" }}
              className="max-h-screen"
            ></Image>
          </div>
          <div className="w-[35%] mx-16">
            <h2 className="text-3xl text-center mt-4 font-bold ml-36">
              Register Now
            </h2>

            <div className="text-container justify-center items-center w-full">
              <hr className="mx-10 my-5 border-gray-600 w-[90%]" />
              <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 20 }}
                style={{ maxWidth: 750 }}
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
                autoComplete="off"
                className="w-full"
              >
                <Form.Item label="Role" name="role">
                  <Radio.Group
                    onChange={(e) => setRole(e.target.value)}
                    // value={selectedValue}
                  >
                    {options.map((option) => (
                      <Radio key={option.value} value={option.value}>
                        {option.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
                {(role === "Admin" || role === "Donar") && (
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                )}
                {role === "Organization" && (
                  <Form.Item
                    label="Organization"
                    name="organizationName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Organization Name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                )}
                {role === "Hospital" && (
                  <Form.Item
                    label="Hospital Name"
                    name="hospitalName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Hospital Name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                )}
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your email address!",
                    },
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="Website"
                  name="website"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your website Name!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Address"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Address!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your Phone number!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{ offset: 8, span: 16 }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              <p className="mb-4  ml-20">
                Already have an account?
                <span
                  className="text-blue-600 font-bold cursor-pointer"
                  onClick={() => router.push("/login")}
                >
                  Login Now
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
