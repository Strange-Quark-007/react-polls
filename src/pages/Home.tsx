import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPoll from "../components/AddPoll";
import PollCard from "../components/PollCard";
import useAllPolls from "../hooks/allPosts";
import { UserContext } from "../App";
import { PollData, User } from "../types";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const allPolls = useAllPolls();
  const [filteredPolls, setFilteredPolls] = useState<PollData[]>([]);
  const isAdmin = user?.role === "admin";

  const filterPolls = (user: User | null, allPolls: PollData[]) => {
    if (!user) return [];
    return user.role !== "admin"
      ? allPolls.filter((poll) => poll.status !== "closed")
      : allPolls;
  };

  const updatePollsList = (pollsList: PollData[]) => {
    setFilteredPolls(pollsList);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setFilteredPolls(filterPolls(user, allPolls));
  }, [user, allPolls]);

  return (
    <div className="flex flex-wrap bg-blue-200 gap-4 m-2">
      {isAdmin && <AddPoll updatePolls={updatePollsList} />}
      {filteredPolls.map((poll) => (
        <PollCard key={poll.id} poll={poll} updatePolls={updatePollsList} />
      ))}
    </div>
  );
};

export default Home;
