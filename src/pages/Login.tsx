import { useContext, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { User } from "../types";

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const loggedInUser: User | null = JSON.parse(
      sessionStorage.getItem("user") || "null"
    );
    setUser(loggedInUser);
    if (loggedInUser) {
      navigate("/");
    }
  }, [user]);

  const onFinish = (formData: FormData) => {
    const allUsers: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = allUsers.find((user) => user.username === formData.username);

    if (!user) {
      message.error("User not found");
      return;
    }

    if (user.password !== formData.password) {
      message.error("Incorrect password");
      return;
    }

    message.success("Login successful");
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return (
    <main className="h-full flex justify-center items-center">
      <Form name="loginForm" onFinish={onFinish} className="w-72">
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
    </main>
  );
};

export default Login;
