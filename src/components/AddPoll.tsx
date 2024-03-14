import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Modal, Input, Form, Card, message } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { PollData } from "../types";
import useAllPolls from "../hooks/allPosts";

type FormData = {
  pollLabel: string;
  questions: Question[];
};

type Question = {
  questionLabel: string;
  options: string[];
};

interface Props {
  updatePolls: (newPoll: PollData[]) => void;
}

const AddPoll: React.FC<Props> = ({ updatePolls }) => {
  const [pollForm] = Form.useForm();
  const allPolls = useAllPolls();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    pollForm.resetFields();
    setIsModalVisible(false);
  };

  const onFinish = (values: FormData) => {
    const poll: PollData = {
      ...values,
      id: uuidv4(),
      status: "open",
      questions: values.questions.map((question: Question) => ({
        ...question,
        id: uuidv4(),
        options: question.options.map((option: string) => ({
          option,
          votes: 0,
          id: uuidv4(),
        })),
      })),
    };
    const updatedPolls = [...allPolls, poll];
    localStorage.setItem("allPolls", JSON.stringify(updatedPolls));
    pollForm.resetFields();
    message.success("Poll Created!");
    setIsModalVisible(false);
    updatePolls(updatedPolls);
  };

  const renderOptions = (optionFields: any, { remove, add }: any) => (
    <>
      {optionFields.map((field: any, index: number) => (
        <div key={field.key} className="flex mb-2">
          <Form.Item
            {...field}
            rules={[
              { required: true, message: "Please input the option!" },
              { pattern: /\S/, message: "Field cannot be blank!" },
            ]}
          >
            <Input placeholder={`Option ${index + 1}`} className="w-60" />
          </Form.Item>
          {index > 1 && (
            <Button
              className="ml-2"
              icon={<MinusOutlined />}
              onClick={() => remove(field.name)}
            />
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
                { required: true, message: "Please input the question!" },
                { pattern: /\S/, message: "Field cannot be blank!" },
              ]}
            >
              <Input placeholder={`Question ${index + 1}`} className="w-72" />
            </Form.Item>
            {index > 0 && (
              <Button
                className="ml-2"
                icon={<MinusOutlined />}
                onClick={() => remove(field.name)}
              />
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
      <Card className="size-52 flex flex-col items-center justify-evenly border-2 border-black bg-transparent">
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
              { required: true, message: "Please input the label!" },
              { pattern: /\S/, message: "Field cannot be blank!" },
            ]}
          >
            <Input placeholder="Poll Label" />
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
