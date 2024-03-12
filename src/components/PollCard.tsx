import { useState } from "react";
import { Card, Button, Popover } from "antd";
import { PollData, User } from "../types";
import { useNavigate } from "react-router-dom";

type VoteFormProps = {
  poll: PollData;
};

const PollCard: React.FC<VoteFormProps> = ({ poll }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/poll/${poll.id}`);
  };

  const handleClosePoll = () => {
    const allPolls: PollData[] = JSON.parse(localStorage.getItem("allPolls")!);
    const updatedPolls = allPolls.map((item) => {
      if (item.id === poll.id) {
        return { ...item, status: "closed" };
      }
      return item;
    });
    localStorage.setItem("allPolls", JSON.stringify(updatedPolls));
    setShowConfirmation(false);
  };

  const status = poll.status;
  const user: User = JSON.parse(sessionStorage.getItem("user") || "{}");

  return (
    <Card className="size-52 flex flex-col items-center justify-center border-2 m-4 border-black bg-blue-300 rounded-xl">
      <h1 className="text-center font-bold mb-8">{poll.pollLabel}</h1>
      <div className="flex flex-col gap-4 w-28">
        <Button type="primary" className="bg-blue-500" onClick={handleView}>
          View Poll
        </Button>
        {user?.role === "admin" && (
          <Popover
            content={
              <>
                <p>Are you sure you want to close the poll?</p>
                <div className="mt-4 flex gap-2">
                  <Button
                    type="primary"
                    className="bg-red-300"
                    onClick={handleClosePoll}
                  >
                    Yes
                  </Button>
                  <Button
                    type="dashed"
                    className="bg-blue-200"
                    onClick={() => setShowConfirmation(false)}
                  >
                    No
                  </Button>
                </div>
              </>
            }
            title="Close Poll"
            trigger="click"
            open={showConfirmation}
            onOpenChange={(visible) => setShowConfirmation(visible)}
          >
            <Button
              disabled={status === "closed"}
              type="dashed"
              className="bg-red-400 border-red-400 border-2"
            >
              Close Poll
            </Button>
          </Popover>
        )}
      </div>
    </Card>
  );
};

export default PollCard;
