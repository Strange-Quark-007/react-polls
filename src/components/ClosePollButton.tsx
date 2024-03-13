import React, { useState } from "react";
import { Button, Popover } from "antd";
import { PollData } from "../types";
import useAllPolls from "../hooks/allPosts";

interface ClosePollButtonProps {
  poll: PollData;
  updatePolls?: (updatedPolls: PollData[]) => void;
}

const ClosePollButton: React.FC<ClosePollButtonProps> = ({
  poll,
  updatePolls,
}) => {
  const allPolls = useAllPolls();
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleClosePoll = () => {
    const updatedPolls = allPolls.map((item) => {
      if (item.id === poll.id) {
        const updatedStatus: "closed" | "open" = "closed";
        return { ...item, status: updatedStatus };
      }
      return item;
    });
    localStorage.setItem("allPolls", JSON.stringify(updatedPolls));
    setShowConfirmation(false);
    if (updatePolls) updatePolls(updatedPolls);
  };

  const confirmationContent = (
    <>
      <p>Are you sure you want to close the poll?</p>
      <div className="mt-4 flex gap-2">
        <Button type="primary" className="bg-red-300" onClick={handleClosePoll}>
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
  );

  return (
    <Popover
      content={confirmationContent}
      title="Close Poll"
      trigger="click"
      open={showConfirmation}
      onOpenChange={(visible) => setShowConfirmation(visible)}
    >
      <Button
        disabled={poll.status === "closed"}
        type="dashed"
        className="bg-red-400 border-red-400 border-2"
      >
        {poll.status === "closed" ? "Closed" : "Close Poll"}
      </Button>
    </Popover>
  );
};

export default ClosePollButton;
