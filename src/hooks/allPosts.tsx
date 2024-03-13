import { useState, useEffect } from "react";
import { PollData } from "../types";

const useAllPolls = (): PollData[] => {
  const [allPolls, setAllPolls] = useState<PollData[]>([]);

  useEffect(() => {
    const polls: PollData[] = JSON.parse(
      localStorage.getItem("allPolls") || "[]"
    );
    setAllPolls(polls);
  }, []);

  return allPolls;
};

export default useAllPolls;
