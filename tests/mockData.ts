export const mockAllPolls = [
  {
    pollLabel: "Poll 1",
    questions: [
      {
        options: [
          {
            option: "O1",
            votes: 0,
            id: "c5cf880d-06f2-4b15-a785-083d3fe967f8",
          },
          {
            option: "O2",
            votes: 0,
            id: "15f485bb-9c2e-42a6-b2a1-b2ec6067ac5d",
          },
          {
            option: "O3",
            votes: 0,
            id: "eaf388d2-3a03-4ed7-906c-363f08ae0bf6",
          },
        ],
        questionLabel: "Q1",
        id: "847e4cf2-a524-4421-8d23-c1dcfab7499f",
      },
      {
        options: [
          {
            option: "Opt 1",
            votes: 0,
            id: "8b3174ae-e4dc-4d0c-8fa3-96f0b2edc1f7",
          },
          {
            option: "Opt 2",
            votes: 0,
            id: "24e7764f-0446-4035-ba81-5b81005f3d44",
          },
        ],
        questionLabel: "Que 2",
        id: "764681e9-6738-482e-92f2-f0fbc1e71795",
      },
    ],
    id: "83702fbf-6024-46a7-8577-860f10341691",
    status: "open",
  },
];

export const mockUsers = [
  {
    id: "admin",
    username: "admin",
    firstName: "admin",
    lastName: "admin",
    role: "admin",
    password: "admin",
  },
  {
    id: "user",
    username: "user",
    firstName: "user",
    lastName: "user",
    role: "user",
    password: "user",
  },
];

export const mockRegisterUser = {
  username: "test",
  firstName: "test",
  lastName: "test",
  role: "admin",
  password: "test",
};

export const mockAddPoll = {
  pollLabel: "Test Poll",
  questions: [
    {
      options: [
        {
          option: "Test O1",
        },
        {
          option: "Test O2",
        },
        {
          option: "Test O3",
        },
      ],
      questionLabel: "Test Q1",
    },
    {
      options: [
        {
          option: "Test O1",
        },
        {
          option: "Test O2",
        },
        {
          option: "Test O3",
        },
      ],
      questionLabel: "Test Q2",
    },
  ],
  status: "open",
};
