import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form, Input, Button, Select, message } from "antd";
const { Option } = Select;
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { User } from "../types";

interface formData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const Register: React.FC = () => {
  const formRef = useRef<any>(null);
  const onFinish = (formData: formData) => {
    const userId = uuidv4();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const { username, firstName, lastName, role, password } = formData;
    const newUser: User = {
      id: userId,
      username: username,
      firstName: firstName,
      lastName: lastName,
      role: role,
      password: password,
    };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    message.success("User Registered successfully");
    formRef.current.resetFields();
  };

  return (
    <div className="h-screen flex justify-center items-center bg-blue-200">
      <Form
        ref={formRef}
        name="registrationForm"
        initialValues={{ role: "user" }}
        onFinish={onFinish}
        className="w-72"
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="First name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Last name" />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
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

        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>

        <Form.Item
          name="role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select placeholder="Select a role">
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            className="bg-blue-500 w-full"
            htmlType="submit"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
