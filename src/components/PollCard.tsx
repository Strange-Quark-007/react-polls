import { Card, Button } from "antd";
import { PollData, User } from "../types";

type VoteFormProps = {
  poll: PollData;
};

const PollCard: React.FC<VoteFormProps> = ({ poll }) => {
  const handleViewClick = () => {
    console.log("View options clicked");
  };

  const handleCloseClick = () => {
    console.log("Close poll clicked");
  };
  const status = poll.status;
  const user: User = JSON.parse(sessionStorage.getItem("user") || "{}");

  return (
    <Card className="size-52 flex flex-col items-center justify-center border-2 m-4 border-black bg-blue-300 rounded-xl">
      <h1 className="text-center font-bold mb-8">{poll.pollLabel}</h1>
      <div className="flex flex-col gap-4 w-28">
        <Button
          type="primary"
          className="bg-blue-500"
          onClick={handleViewClick}
        >
          View Poll
        </Button>
        {user?.role === "admin" && (
          <Button
            disabled={status === "closed"}
            type="dashed"
            className="bg-red-400 border-2 border-red-400"
            onClick={handleCloseClick}
          >
            Close Poll
          </Button>
        )}
      </div>
    </Card>
  );
};

export default PollCard;
