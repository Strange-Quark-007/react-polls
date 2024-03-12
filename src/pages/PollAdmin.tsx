import { useEffect, useState } from "react";
import { Radio, Button, Typography, List } from "antd";
import { Link, useParams } from "react-router-dom";
import { PollData, PollQuestion, PollOption } from "../types";
import ClosePollButton from "../components/ClosePollButton";

const { Title } = Typography;

const PollAdmin: React.FC = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState<PollData>();

  useEffect(() => {
    const polls: PollData[] = JSON.parse(
      localStorage.getItem("allPolls") || "[]"
    );
    const pollData = polls.find((item) => item.id === pollId);
    setPoll(pollData);
  }, [pollId]);

  return (
    <div className="m-2 p-4 w-2/4 border-2 border-gray-300 bg-gray-200 shadow-lg rounded-lg">
      <Title level={2}>{poll?.pollLabel}</Title>
      <List itemLayout="vertical">
        {poll?.questions.map((question: PollQuestion) => (
          <List.Item key={question.id}>
            <Title level={3}>{question.questionLabel}</Title>
            <Radio.Group>
              {question.options.map((option: PollOption) => (
                <Radio key={option.id} value={option.id} className="mb-2 block">
                  {option.option}
                </Radio>
              ))}
            </Radio.Group>
          </List.Item>
        ))}
      </List>
      <div className="flex justify-between mt-3">
        {poll && <ClosePollButton poll={poll} />}
        <Link to="/">
          <Button
            type="dashed"
            className="bg-red-200 text-md border-2 border-red-300"
          >
            Back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PollAdmin;
