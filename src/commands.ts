import { askForPassword } from "./questions";

export const isAllowed = (mainPassword: string): boolean =>
  mainPassword === "Gotham";

export const existingUser = (username: string): boolean =>
  username === "Batman";

export const handleSetPassword = async (
  passwordName: string
): Promise<void> => {
  const passwordValue = await askForPassword();
  console.log(`Your ${passwordName} is ${passwordValue}!`);
};

export const handleGetPassword = async (
  passwordName: string
): Promise<void> => {
  console.log(`Your ${passwordName} is "Gotham"!`);
};
