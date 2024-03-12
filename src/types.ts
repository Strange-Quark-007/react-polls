export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: string;
};

type PollOption = {
  id: string;
  option: string;
};

type PollQuestion = {
  id: string;
  questionLabel: string;
  options: PollOption[];
};

export type PollData = {
  id: string;
  pollLabel: string;
  questions: PollQuestion[];
  status: "open" | "closed";
};
