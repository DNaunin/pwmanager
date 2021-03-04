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

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    await connectDB(url, "pwmanager-dörte");
    // await createPasswordDoc({ name: "Hulk", value: "111" });
    // await deletePasswordDoc("Batman");
    // await updatePasswordValue("Batman", "999");
    console.log(await readPasswordDoc("Dörte"));
    // console.log(await readPasswordDoc("Batman"));
    console.log(await readPasswordDoc("Hulk"));
    await closeDB();
  } catch (error) {
    console.error(error);
  }

  // console.log(`Welcome to the ${chalk.underline.blue("Password Manager")} 🔐`);
  // const answers = await askTheQuestions();
  // if (!existingUser(answers.username)) {
  //   console.log("You are not our user!");
  //   run();
  // }
  // if (!isAllowed(answers.mainPassword)) {
  //   console.log("Access denied!");
  //   run();
  //   return;
  // }

  // const action = await askForAction();
  // switch (action.command) {
  //   case "set":
  //     handleSetPassword(action.passwordName);
  //     break;
  //   case "get":
  //     handleGetPassword(action.passwordName);
  //     break;
  // }
};

run();
