import React, { useContext } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { User } from "../types";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const onFinish = (formData: FormData) => {
    const allUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = allUsers.find(user => user.username === formData.username);

    if (!user) {
      message.error("User not found");
      return;
    }

    if (user.password !== formData.password) {
      message.error("Incorrect password");
      return;
    }

    message.success("Login successful");
    const { id, username, role } = user;
    sessionStorage.setItem(
      "user",
      JSON.stringify({ id: id, username: username, role: role })
    );
    setUser(user);
    navigate("/");
  };

  return (
    <div className="h-screen flex justify-center items-center bg-blue-200">
      <Form
        name="loginForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className="w-72"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            className="bg-blue-500 w-full"
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
