import { NextResponse } from "next/server";
import puppeteer from "puppeteer-extra";
import Adblocker from "puppeteer-extra-plugin-adblocker";
import UserAgent from "user-agents";
import { JSDOM } from "jsdom";
import { ElementHandle, EventEmitter, Page, PageEvents } from "puppeteer";
import { IInfoPlayer } from "interfaces";
import { getElement } from "../utils";

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
    player,
    playerPos,
    playerCountry,
    playerRef,
  };
  return infoPlayer;
};

const getInfoTeam = async ({ page }: { page: Page }) => {
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
      .join(" ")
      .split(":");
    return newText;
  });

  const res = {
    Name: name,
    Record: info[0].slice(-1)[0],
    Coach: info[1].slice(-1)[0],
    Executive: info[2].slice(-1)[0],
  };

  return res;
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
  const infoTeam = await getInfoTeam({ page: page });
  await browser.close();
  return infoTeam;
};

export async function POST(request: Request) {
  const { codeTeam, year } = await request.json();
  const response = await Puppeteer({ url: `${url}/${codeTeam}/${year}.html` });
  return NextResponse.json(response);
}

export async function postGameResult(request: Request) {
  console.log("A", request);
}
