import prompts from "prompts";
import chalk from "chalk";
import { askForAction, askTheQuestions } from "./questions";
import {
  existingUser,
  handleGetPassword,
  handleSetPassword,
  isAllowed,
} from "./commands";

const run = async () => {
  console.log(`Welcome to the ${chalk.underline.blue("Password Manager")} 🔐`);
  const answers = await askTheQuestions();
  // if (!existingUser(answers.username)) {
  //   console.log("You are not our user!");
  //   run();
  // }
  if (!isAllowed(answers.mainPassword)) {
    console.log("Access denied!");
    run();
    return;
  }

  const action = await askForAction();
  switch (action.command) {
    case "set":
      handleSetPassword(action.passwordName);
      break;
    case "get":
      handleGetPassword(action.passwordName);
      break;
  }
};

run();
