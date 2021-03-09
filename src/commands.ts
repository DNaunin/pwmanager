import { createPasswordDoc, readPasswordDoc, updatePasswordValue } from "./db";
import { printPassword, printPasswordSet } from "./messages";
import { askForPasswordValue } from "./questions";

export const isAllowed = (mainPassword: string): boolean =>
  mainPassword === "Gotham";

export const existingUser = (username: string): boolean =>
  username === "Batman";

export const handleSetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordValue = await askForPasswordValue();
  const passwordDoc = await readPasswordDoc(passwordName);
  if (passwordDoc) {
    console.log("Password already present. Updating existing value!");
    await updatePasswordValue(passwordName, passwordValue);
  } else {
    await createPasswordDoc({ name: passwordName, value: passwordValue });
  }
  printPasswordSet(passwordName);
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
