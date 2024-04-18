import { NextResponse } from "next/server";
import UserAgent from "user-agents";
import { Page } from "puppeteer";
import { IInfoTeam } from "interfaces";
import { getElement, initialBrowser } from "../utils";

const url = `https://www.basketball-reference.com/teams`;
const getInfoTeam = async ({ page }: { page: Page }): Promise<IInfoTeam> => {
  const teamDocument = await getElement(
    page,
    `[data-template="Partials/Teams/Summary"]`
  );
  const name = teamDocument.querySelectorAll("h1>span")[1].textContent;
  const info = [...teamDocument.querySelectorAll("p")].map((el) => {
    const newText = String(el.textContent)
      .replace(/[\n\t]+/g, "")
      .split(" ")
      .filter((el) => el !== "")
      .join(" ");
    return newText;
  });
  const res: IInfoTeam = {
    name: name,
    record: info.find((el) => /Record/.test(el))?.split(":")[1] || "",
    coach: info.find((el) => /Coach/.test(el))?.split(":")[1] || "",
    executive: info.find((el) => /Executive/.test(el))?.split(":")[1] || "",
  };

  return res;
};

const Puppeteer = async ({ url }: { url: string }) => {
  const browser = await initialBrowser();
  const page = await browser.newPage();
  const userAgent = new UserAgent();
  await page.setUserAgent(userAgent.toString());
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  await page.goto(url);
  const infoTeam = await getInfoTeam({ page: page });
  await browser.close();
  return infoTeam;
};

export async function POST(request: Request) {
  const { codeTeam, year } = await request.json();
  const response = await Puppeteer({ url: `${url}/${codeTeam}/${year}.html` });
  return NextResponse.json(response);
}
