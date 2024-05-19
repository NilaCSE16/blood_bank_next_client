"use client";

import React, { useState } from "react";

import type { FormProps } from "antd";
import { Alert, Button, Checkbox, Form, Input, Radio, Spin } from "antd";
import Image from "next/image";
import banner1 from "../../public/assets/bannar2.jpg";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/(rootLayout)/lib/hooks";
import { loginUser } from "./Redux/features/auth/authSlice";
import { useSelector } from "react-redux";

type FieldType = {
  role?: string;
  email?: string;
  password?: string;
  remember?: string;
};

interface RadioOption {
  value: string;
  label: string;
}

// interface loginFormInputs {
//   role: string | null;
//   email: string | null;
//   password: string | null;
// }

const Login = () => {
  const options1: RadioOption[] = [
    { value: "Admin", label: "Admin" },
    { value: "Organization", label: "Organization" },
    { value: "Donar", label: "Donar" },
    { value: "Hospital", label: "Hospital" },
    // ... add more options
  ];
  const [role, setRole] = useState("Donar");
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const [postNewUser, ...options] = usePostNewUserMutation();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    // console.log("Success:", values.role);
    const { role, email, password } = values;
    if (
      typeof role === "string" &&
      typeof email === "string" &&
      typeof password === "string"
    ) {
      // postNewUser({ role, email, password });
      dispatch(loginUser({ role, email, password })).then(() => {
        window.location.replace("/");
      });
      // window.location.replace("/");
    } else {
      alert("Invalid Type");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    alert("Please enter the valid role, email and password");
    // console.log("Failed:", errorInfo);
  };
  const { isLoading, error } = useSelector((state: any) => state.auth);
  return (
    <>
      {/* {error && <Alert message="Error" type="error" showIcon />} */}
      {isLoading ? (
        <Spin className=" flex w-full min-h-screen justify-center items-center"></Spin>
      ) : (
        <div className="flex">
          <div className="w-[60%] h-full">
            <Image
              src={banner1}
              alt=""
              priority
              height={0}
              width={0}
              style={{ width: "full", height: "700px" }}
              className="rounded-md max-h-screen"
            ></Image>
          </div>
          <div className="text-container">
            <h2 className="text-3xl text-center my-10 font-bold">Login Now</h2>
            <div className="justify-center items-center">
              <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 20 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="w-full mx-8"
              >
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your role",
                    },
                  ]}
                >
                  <Radio.Group
                    onChange={(e) => setRole(e.target.value)}
                    // value={selectedValue}
                  >
                    {options1.map((option) => (
                      <Radio key={option.value} value={option.value}>
                        {option.label}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
                <Form.Item<FieldType>
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

                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                  name="remember"
                  valuePropName="checked"
                  wrapperCol={{ offset: 3, span: 9 }}
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
                New to this website? Please{" "}
                <span
                  className="text-blue-600 font-bold cursor-pointer"
                  onClick={() => router.push("/register")}
                >
                  Register Now
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
