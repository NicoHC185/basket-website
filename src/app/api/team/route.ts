import { NextResponse } from "next/server";
import puppeteer from "puppeteer-extra";
import Adblocker from "puppeteer-extra-plugin-adblocker";
import UserAgent from "user-agents";
import { JSDOM } from "jsdom";
import { ElementHandle, EventEmitter, Page, PageEvents } from "puppeteer";

const url = `https://www.basketball-reference.com/teams`;

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
  const targetElement = await page.$eval(
    "#all_roster>div>table",
    (el) => el.outerHTML
  );
  const tableDOM = new JSDOM(targetElement);
  const { document: tableDocument } = tableDOM.window;
  const rows = tableDocument.querySelectorAll("tbody>tr");
  const roster = [...rows].map((row) => {
    const number = row.querySelector('[data-stat="number"]')?.textContent;
    const player = row.querySelector('[data-stat="player"]')?.textContent;
    const playerRef = row.querySelector("a")?.href;
    const playerPos = row.querySelector('[data-stat="pos"]')?.textContent;
    const playerCountry = row.querySelector(
      '[data-stat="birth_country"]'
    )?.textContent;
    const playerInfo = {
      number,
      player,
      playerPos,
      playerCountry,
      playerRef,
    };
    return playerInfo;
  });
  await browser.close();
  return roster;
};

export async function POST(request: Request) {
  const { codeTeam, year } = await request.json();
  const response = await Puppeteer({ url: `${url}/${codeTeam}/${year}.html` });
  return NextResponse.json(response);
}
