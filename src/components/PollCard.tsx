import { Card, Button } from "antd";
import { PollData } from "../types";
import { useNavigate } from "react-router-dom";
import ClosePollButton from "./ClosePollButton";
import { useContext } from "react";
import { UserContext } from "../App";

type VoteFormProps = {
  poll: PollData;
  updatePolls: (pollsList: PollData[]) => void;
};

const PollCard: React.FC<VoteFormProps> = ({ poll, updatePolls }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const isAdmin = user?.role === "admin";

  const handleView = () => {
    navigate(`/${user?.role}/${poll.id}`);
  };

  return (
    <Card className="size-52 flex flex-col items-center justify-center border-2 border-black bg-blue-300 rounded-xl">
      <h1 className="text-center font-bold mb-8">{poll.pollLabel}</h1>
      <div className="flex flex-col gap-4 w-28">
        <Button type="primary" className="bg-blue-500" onClick={handleView}>
          {isAdmin ? "View Details" : "Vote Now"}
        </Button>
        {isAdmin && <ClosePollButton poll={poll} updatePolls={updatePolls} />}
      </div>
    </Card>
  );
};

export default PollCard;
