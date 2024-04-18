import { NextResponse } from "next/server";
import UserAgent from "user-agents";
import { Page } from "puppeteer";
import { IGameResult } from "interfaces";
import { getElement, initialBrowser } from "app/api/utils";

const url = `https://www.basketball-reference.com/teams`;

const getGameResult = async ({
  page,
}: {
  page: Page;
}): Promise<IGameResult[]> => {
  const document = await getElement(page, `#timeline_results`);
  const result = [...document.querySelectorAll("ul>li")]
    .filter((el) => el.className === "result")
    .map((el) => {
      const textSplit = String(el.textContent).split(",");
      const dateSplit = textSplit[0]
        .replace(/(\r\n|\n|\r)/gm, "")
        .split(".")[1]
        .split(" ");
      const teamsSplit = textSplit[1].split(" ");
      const date = `${dateSplit[1]} ${dateSplit[2]}`;
      const teams = [teamsSplit[1], teamsSplit.slice(-1)[0]];
      const result = teamsSplit[2].match(/\d+/g);
      const score = String(textSplit[2])
        .replace(/(\r\n|\n|\r)/gm, "")
        .split(" ")[1]
        .split("-");
      return {
        date,
        teams,
        result,
        score,
      };
    });
  return result;
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
  const result = await getGameResult({ page: page });
  await browser.close();
  return result;
};

export async function POST(request: Request) {
  const { codeTeam, year } = await request.json();
  const response = await Puppeteer({ url: `${url}/${codeTeam}/${year}.html` });
  return NextResponse.json(response);
}
