import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPoll from "../components/AddPoll";
import PollCard from "../components/PollCard";
import { PollData } from "../types";
import { UserContext } from "../App";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [allPolls, setAllPolls] = useState<PollData[]>([]);

  useEffect(() => {
    const polls: PollData[] = JSON.parse(
      localStorage.getItem("allPolls") || "[]"
    );
    const filteredPolls =
      user?.role !== "admin"
        ? polls.filter((poll) => poll.status !== "closed")
        : polls;
    setAllPolls(filteredPolls);
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  const updatePollsList = (pollsList: PollData[]) => {
    setAllPolls(pollsList);
  };

  return (
    <div className="flex flex-wrap bg-blue-200 gap-4 m-2">
      {user?.role === "admin" && <AddPoll updatePolls={updatePollsList} />}
      {allPolls.map((poll) => (
        <PollCard key={poll.id} poll={poll} updatePolls={updatePollsList} />
      ))}
    </div>
  );
};

export default Home;
