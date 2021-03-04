import prompts from "prompts";
import chalk from "chalk";
import { askForAction, askTheQuestions } from "./questions";
import {
  existingUser,
  handleGetPassword,
  handleSetPassword,
  isAllowed,
} from "./commands";

import dotenv from "dotenv";
import {
  connectDB,
  readPasswordDoc,
  closeDB,
  createPasswordDoc,
  deletePasswordDoc,
  updatePasswordValue,
} from "./db";
dotenv.config();

type CommandToFunction = {
  set: (passwordName: string) => Promise<void>;
  get: (passwordName: string) => Promise<void>;
};
const commandToFunction: CommandToFunction = {
  set: handleSetPassword,
  get: handleGetPassword,
};

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    const credentials = await askTheQuestions();
    if (!isAllowed(credentials.mainPassword)) {
      console.log("Welcome to Your Password Manager 🔐");
      run();
      return;
    }

    await connectDB(url, "pwmanager-dörte");

    const action = await askForAction();
    const commandFunction = commandToFunction[action.command];
    commandFunction(action.passwordName);

    await closeDB();
  } catch (error) {
    console.error(error);
  }
};

run();
