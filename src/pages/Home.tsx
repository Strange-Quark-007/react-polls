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
        ? polls.filter(poll => poll.status !== "closed")
        : polls;
    setAllPolls(filteredPolls);
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="h-screen flex bg-blue-200">
      {user?.role === "admin" && <AddPoll />}
      {allPolls.map(poll => (
        <PollCard poll={poll} key={poll.id} />
      ))}
    </div>
  );
};

export default Home;
