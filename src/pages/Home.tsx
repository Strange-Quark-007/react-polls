import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPoll from "../components/AddPoll";
import PollCard from "../components/PollCard";
import { PollData } from "../types";
import { UserContext } from "../App";
import useAllPolls from "../hooks/allPosts";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const allPolls = useAllPolls();
  const [filteredPolls, setFilteredPolls] = useState<PollData[]>([]);

  useEffect(() => {
    if (user) {
      const filtered =
        user.role !== "admin"
          ? allPolls.filter((poll) => poll.status !== "closed")
          : allPolls;
      setFilteredPolls(filtered);
    } else {
      navigate("/login");
    }
  }, [user, allPolls]);

  const updatePollsList = (pollsList: PollData[]) => {
    setFilteredPolls(pollsList);
  };

  return (
    <div className="flex flex-wrap bg-blue-200 gap-4 m-2">
      {user?.role === "admin" && <AddPoll updatePolls={updatePollsList} />}
      {filteredPolls.map((poll) => (
        <PollCard key={poll.id} poll={poll} updatePolls={updatePollsList} />
      ))}
    </div>
  );
};

export default Home;
