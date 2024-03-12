import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Modal, Input, Form, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PollData } from "../types";

type FormData = {
  pollLabel: string;
  questions: Question[];
};

type Question = {
  questionLabel: string;
  options: string[];
};

const AddPoll = () => {
  const [pollForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    pollForm.resetFields();
    setIsModalVisible(false);
  };

  const onFinish = (values: FormData) => {
    const poll = {
      ...values,
      id: uuidv4(),
      status: "open",
      questions: values.questions.map((question: any) => ({
        ...question,
        id: uuidv4(),
        options: question.options.map((option: any) => ({
          option,
          votes: 0,
          id: uuidv4(),
        })),
      })),
    };
    const allPolls: PollData[] = JSON.parse(
      localStorage.getItem("allPolls") || "[]"
    );
    localStorage.setItem("allPolls", JSON.stringify([...allPolls, poll]));
    pollForm.resetFields();
    setIsModalVisible(false);
  };

  const renderOptions = (optionFields: any, { remove, add }: any) => (
    <>
      {optionFields.map((field: any, index: number) => (
        <div key={field.key} className="flex mb-2">
          <Form.Item
            {...field}
            rules={[
              {
                required: true,
                message: "Please input the option!",
              },
            ]}
          >
            <Input placeholder={`Option ${index + 1}`} className="w-60" />
          </Form.Item>
          {index > 1 && (
            <Button className="ml-2" onClick={() => remove(field.name)}>
              -
            </Button>
          )}
        </div>
      ))}
      <Form.Item>
        <Button type="dashed" onClick={() => add()} block>
          + Add Option
        </Button>
      </Form.Item>
    </>
  );

  const renderQuestions = (quesFields: any, { remove, add }: any) => (
    <>
      {quesFields.map((field: any, index: number) => (
        <div key={field.key} className="p-4">
          <div className="flex w-full justify-between">
            <Form.Item
              {...field}
              label={`Question ${index + 1}`}
              name={[field.name, "questionLabel"]}
              rules={[
                {
                  required: true,
                  message: "Please input the question!",
                },
              ]}
            >
              <Input className="w-72" />
            </Form.Item>
            {index > 0 && (
              <Button className="ml-2" onClick={() => remove(field.name)}>
                -
              </Button>
            )}
          </div>
          <Form.Item {...field} label="Options" name={[field.name, "options"]}>
            <Form.List name={[field.name, "options"]} initialValue={["", ""]}>
              {(optionFields, { remove, add }) =>
                renderOptions(optionFields, { remove, add })
              }
            </Form.List>
          </Form.Item>
        </div>
      ))}
      <Form.Item>
        <Button type="dashed" onClick={() => add()} block>
          + Add Question
        </Button>
      </Form.Item>
    </>
  );

  return (
    <>
      <Card className="size-52 flex flex-col items-center justify-evenly border-2 m-4 border-black bg-transparent">
        <h1 className="text-center font-bold mb-8">Create a new poll</h1>
        <Button type="dashed" icon={<PlusOutlined />} onClick={showModal}>
          Add Poll
        </Button>
      </Card>
      <Modal
        title="Create Poll"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        <Form form={pollForm} name="createPollForm" onFinish={onFinish}>
          <Form.Item
            label="Poll Label"
            name="pollLabel"
            rules={[
              {
                required: true,
                message: "Please input the label!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.List name="questions" initialValue={[""]}>
            {(quesFields, { remove, add }) =>
              renderQuestions(quesFields, { remove, add })
            }
          </Form.List>
          <Form.Item>
            <Button type="primary" className="bg-blue-300" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPoll;
