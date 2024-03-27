import Logos from "icons";

export const findLogo = (code: string) => {
  return Logos.find((el) => el.code === code)?.logo;
};
