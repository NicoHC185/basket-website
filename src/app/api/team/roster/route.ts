import { NextResponse } from "next/server";
import puppeteer from "puppeteer-extra";
import Adblocker from "puppeteer-extra-plugin-adblocker";
import UserAgent from "user-agents";
import { JSDOM } from "jsdom";
import { ElementHandle, EventEmitter, Page, PageEvents } from "puppeteer";
import { IInfoPlayer } from "interfaces";
import { getElement } from "app/api/utils";

const url = `https://www.basketball-reference.com/teams`;

const getInfoPlayer = ({ row }: { row: Element }): IInfoPlayer => {
  const number = row.querySelector('[data-stat="number"]')?.textContent;
  const player = row.querySelector('[data-stat="player"]')?.textContent;
  const playerRef = row.querySelector("a")?.href;
  const playerPos = row.querySelector('[data-stat="pos"]')?.textContent;
  const playerCountry = row.querySelector(
    '[data-stat="birth_country"]'
  )?.textContent;
  const infoPlayer: IInfoPlayer = {
    number,
    name: player,
    position: playerPos,
    country: playerCountry,
    href: playerRef,
  };
  return infoPlayer;
};

const getRoster = async ({ page }: { page: Page }): Promise<IInfoPlayer[]> => {
  const tableDocument = await getElement(page, `#all_roster>div>table`);
  const rows = tableDocument.querySelectorAll("tbody>tr");
  const roster: IInfoPlayer[] = [...rows].map((row) => {
    return getInfoPlayer({ row });
  });
  return roster;
};

const Puppeteer = async ({ url }: { url: string }) => {
  puppeteer.use(Adblocker({ blockTrackers: true }));
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const userAgent = new UserAgent();
  await page.setUserAgent(userAgent.toString());
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  await page.goto(url);
  const roster = await getRoster({ page: page });
  await browser.close();
  return roster;
};

export async function POST(request: Request) {
  const { codeTeam, year } = await request.json();
  const response = await Puppeteer({ url: `${url}/${codeTeam}/${year}.html` });
  return NextResponse.json(response);
}
