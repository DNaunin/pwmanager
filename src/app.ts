import { askForAction, askTheQuestions } from "./questions";

import { handleGetPassword, handleSetPassword, isAllowed } from "./commands";

import dotenv from "dotenv";
import {
  connectDB,
  readPasswordDoc,
  closeDB,
  createPasswordDoc,
  deletePasswordDoc,
  updatePasswordValue,
} from "./db";
import { printWelcomeMessage, printNoAccess } from "./messages";
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
  printWelcomeMessage();

  try {
    await connectDB(url, "pwmanager-dörte");

    const action = await askForAction();
    const commandFunction = commandToFunction[action.command];
    await commandFunction(action.passwordName);

    // await deletePasswordDoc("Hulk");
    // await createPasswordDoc({ name: "Dörte", value: "1234" });

    // const action = await askForAction();
    // const commandFunction = commandToFunction[action.command];
    // commandFunction(action.passwordName);

    await closeDB();
  } catch (error) {
    console.error(error);
  }
};

run();
