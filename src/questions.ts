import prompts from "prompts";

type Answers = {
  username: string;
  mainPassword: string;
};

export const askTheQuestions = (): Promise<Answers> =>
  prompts([
    {
      type: "text",
      name: "username",
      message: "Type in your Username!",
    },
    {
      type: "password",
      name: "mainPassword",
      message: "Type in your Password!",
    },
  ]);

type Action = {
  command: "get" | "set";
  passwordName: string;
};

export const askForAction = (): Promise<Action> =>
  prompts([
    {
      type: "select",
      name: "command",
      message: "What do you need?",
      choices: [
        { title: "Get Password", value: "get" },
        { title: "Set Password", value: "set" },
      ],
    },
    {
      type: "text",
      name: "passwordName",
      message: "Which Password?",
    },
  ]);

export const askForPassword = async (): Promise<string> => {
  const response = await prompts({
    type: "password",
    name: "passwordValue",
    message: "What is the new Password?",
  });
  return response.passwordValue;
};
