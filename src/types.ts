export type User = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: string;
};

export type PollOption = {
  id: string;
  option: string;
  votes:number;
};

export type PollQuestion = {
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
