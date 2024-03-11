import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Input, Form, Space, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    console.log("Received values:", values);
    setIsModalVisible(false);
  };

  return (
    <div className="h-screen flex bg-blue-200">
      <div>
        <Card
          className="w-52 border-2 m-4 border-black"
          actions={[
            <Button type="dashed" icon={<PlusOutlined />} onClick={showModal}>
              Add Poll
            </Button>,
          ]}
        >
          <h1 className="text-center font-bold">Create a new poll</h1>
        </Card>
      </div>
      <Modal
        title="Create Poll"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form name="createPollForm" onFinish={onFinish}>
          <Form.Item
            label="Poll Label"
            name="pollLabel"
            rules={[
              {
                required: true,
                message: "Please input the label for the poll!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.List name="questions">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...field}
                      label={`Question ${index + 1}`}
                      name={[field.name, "questionLabel"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input the label for the question!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Options"
                      name={[field.name, "options"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input at least one option!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Options"
                      name={[field.name, "options"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input at least one option!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Button onClick={() => remove(field.name)}>-</Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    + Add Question
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Home;
