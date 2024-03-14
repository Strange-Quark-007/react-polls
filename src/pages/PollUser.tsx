import { useContext, useEffect, useState } from "react";
import { Radio, Button, Typography, List, message } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PollData, PollQuestion, PollOption } from "../types";
import { UserContext } from "../App";
import useAllPolls from "../hooks/allPosts";

const { Title } = Typography;

interface SelectedOptions {
  [key: string]: string;
}

const PollUser = () => {
  const { pollId } = useParams();
  const allPolls = useAllPolls();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [poll, setPoll] = useState<PollData>();
  const [userVoted, setUserVoted] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  useEffect(() => {
    if (user?.role !== "user") {
      navigate("/");
    }
    const pollData = allPolls.find((item) => item.id === pollId);
    setPoll(pollData);

    const userPollList: string[] = JSON.parse(
      localStorage.getItem(user?.id || "") || "[]"
    );

    const userVoted = userPollList.includes(pollData?.id || "");

    setUserVoted(userVoted);
  }, [allPolls]);

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [questionId]: optionId,
    }));
  };

  const updatePoll = (poll: PollData) => {
    const updatedPolls = allPolls.map((item) =>
      item.id === poll.id ? poll : item
    );
    localStorage.setItem("allPolls", JSON.stringify(updatedPolls));
  };

  const handleSubmitVote = () => {
    if (Object.keys(selectedOptions).length !== poll?.questions.length) {
      message.error("Please select all options before submitting.");
      return;
    }

    const newPoll = poll && { ...poll };
    if (newPoll) {
      newPoll.questions.forEach((question) => {
        const selectedOptionId = selectedOptions[question.id];
        const selectedOption = question.options.find(
          (option) => option.id === selectedOptionId
        );
        selectedOption!.votes += 1;
      });
      setPoll(newPoll);
      updatePoll(newPoll);
      setUserVoted(true);
      updateVotedList();
      message.success("Voted!");
    }
  };

  const updateVotedList = () => {
    const pollList: string[] = JSON.parse(
      localStorage.getItem(user?.id || "") || "[]"
    );
    pollList.push(poll!.id);
    localStorage.setItem(`${user!.id}`, JSON.stringify(pollList));
  };

  return (
    <div className="m-2 p-4 w-2/4 border-2 border-gray-300 bg-gray-200 shadow-lg rounded-lg">
      <Title level={2}>{poll?.pollLabel}</Title>
      <List itemLayout="vertical">
        {poll?.questions.map((question: PollQuestion) => (
          <List.Item key={question.id}>
            <Title level={3}>{question.questionLabel}</Title>
            <Radio.Group
              onChange={(e) => handleOptionSelect(question.id, e.target.value)}
              value={selectedOptions[question.id]}
            >
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
        <Button
          disabled={userVoted}
          type="primary"
          className="bg-blue-800 animate-none"
          onClick={handleSubmitVote}
        >
          {userVoted ? "Voted" : "Submit Vote"}
        </Button>
        <Link to="/">
          <Button
            type="dashed"
            className="bg-red-200 text-md border-2 border-red-300"
          >
            Back
          </Button>
        </Link>
      </div>
      <p hidden={!userVoted} className="font-mono text-sm mt-2 text-red-600">
        You have voted for this poll!
      </p>
    </div>
  );
};

export default PollUser;
