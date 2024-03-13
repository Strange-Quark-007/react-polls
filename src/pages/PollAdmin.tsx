import { useContext, useEffect, useState } from "react";
import { Radio, Button, Typography, List } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PollData, PollQuestion, PollOption } from "../types";
import ClosePollButton from "../components/ClosePollButton";
import PieChart from "../components/PieChart";
import useAllPolls from "../hooks/allPosts";
import { UserContext } from "../App";

const { Title } = Typography;

const PollAdmin: React.FC = () => {
  const { user } = useContext(UserContext);
  const { pollId } = useParams();
  const allPolls = useAllPolls();
  const navigate = useNavigate();
  const [poll, setPoll] = useState<PollData>();
  const [selectedQuestion, setSelectedQuestion] = useState<PollQuestion>();

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/");
    }
    const pollData = allPolls.find((item) => item.id === pollId);
    setPoll(pollData);
    setSelectedQuestion(pollData?.questions[0]);
  }, [allPolls]);

  const handleQuestionChange = (question: PollQuestion) => {
    setSelectedQuestion(question);
  };

  return (
    <main className="flex flex-col md:flex-row">
      <div className="w-full flex flex-col justify-between m-2 p-4 border-2 border-gray-300 bg-gray-200 shadow-lg rounded-lg">
        <Title level={3}>{poll?.pollLabel}</Title>
        <List itemLayout="vertical">
          {poll?.questions.map((question: PollQuestion) => (
            <Radio.Group
              key={question.id}
              className="flex flex-col justify-between mb-4"
              value={selectedQuestion}
              onChange={(e) => handleQuestionChange(e.target.value)}
            >
              <Radio value={question}>
                <Title level={4}>{question.questionLabel}</Title>
              </Radio>
              <List>
                {question.options.map((option: PollOption) => (
                  <List.Item key={option.id}>{option.option}</List.Item>
                ))}
              </List>
            </Radio.Group>
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

      <div className="md:w-3/5 w-full flex flex-col justify-center items-center m-2 p-4 border-2 border-gray-300 bg-gray-200 shadow-lg rounded-lg">
        {selectedQuestion && <PieChart question={selectedQuestion} />}
      </div>
    </main>
  );
};

export default PollAdmin;
