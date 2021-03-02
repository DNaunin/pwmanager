import prompts from "prompts";
import chalk from "chalk";
import { askForAction, askTheQuestions } from "./questions";
import {
  existingUser,
  handleGetPassword,
  handleSetPassword,
  isAllowed,
} from "./commands";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    const client = await MongoClient.connect(url, {
      useUnifiedTopology: true,
    });
    console.log("Connected to DB!");

    const db = client.db("pwmanager-dörte");

    await db.collection("inventory ").insertOne({
      item: "captainmarvel",
      name: "Captain Marvel",
      publisher: "Marvel",
      aliases: { realname: "Carol Danvers", lastalias: "Miss Marvel" },
      type: "hero",
    });

    client.close();
  } catch (error) {
    console.error(error);
  }

  console.log(`Welcome to the ${chalk.underline.blue("Password Manager")} 🔐`);
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
