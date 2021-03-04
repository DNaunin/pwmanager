import { createPasswordDoc, readPasswordDoc } from "./db";
import { printPassword } from "./messages";
import { askForPasswordValue } from "./questions";

export const isAllowed = (mainPassword: string): boolean =>
  mainPassword === "Gotham";

export const existingUser = (username: string): boolean =>
  username === "Batman";

export const handleSetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordValue = await askForPasswordValue();
  await createPasswordDoc({ name: passwordName, value: passwordValue });
  console.log(`Your password has been added!`);
};

export const handleGetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordDoc = await readPasswordDoc(passwordName);
  if (!passwordDoc) {
    console.log("No Password Found!");
    return;
  }
  printPassword(passwordDoc.name, passwordDoc.value);
};
