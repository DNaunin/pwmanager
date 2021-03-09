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
      message: "What do you like to do now?",
      choices: [
        { title: "Get a password", value: "get" },
        { title: "Set a password", value: "set" },
      ],
    },
    {
      type: "text",
      name: "passwordName",
      message: "Which password?",
    },
  ]);

export const askForPasswordValue = async (): Promise<string> => {
  const response = await prompts({
    type: "password",
    name: "passwordValue",
    message: "What is the new password?",
  });
  return response.passwordValue;
};
