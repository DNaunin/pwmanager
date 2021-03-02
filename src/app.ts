import prompts from "prompts";
import chalk from "chalk";

const prompts = require("prompts");

const questions = [
  {
    type: "text",
    name: "name",
    message: "What is your name?",
  },
  {
    type: "number",
    name: "age",
    message: "How old are you?",
  },
  {
    type: "text",
    name: "about",
    message: chalk.red("What is the answer to everything?"),
    initial: "42",
    validate: (value: string) =>
      value === "42" ? chalk.blue(`You are so wise!`) : `Wrong`,
  },
];

const run = async () => {
  console.log(
    chalk.blue("Welcome ") + chalk.green("to the Password Manager 🔐")
  );

  const response = await prompts(questions);
};

run();
