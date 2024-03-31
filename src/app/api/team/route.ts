// https://www.basketball-reference.com/teams/PHO/2024.html

import { NextResponse } from "next/server";
import puppeteer from "puppeteer-extra";
import Adblocker from "puppeteer-extra-plugin-adblocker";
import UserAgent from "user-agents";
import { JSDOM } from "jsdom";
import { ElementHandle, EventEmitter, Page, PageEvents } from "puppeteer";

const url = `https://www.basketball-reference.com/teams`;

const getTextContent = async ({
  targetElement,
  selector,
}: {
  targetElement: ElementHandle<HTMLTableRowElement> | null;
  selector: string;
}): Promise<string | null | undefined> => {
  const textContent = await targetElement?.$eval(
    selector,
    (el) => el.textContent
  );

  return textContent;
};
const getOuterHTML = async ({
  targetElement,
  selector,
}: {
  targetElement: ElementHandle<HTMLTableRowElement> | null;
  selector: string;
}): Promise<string | undefined> => {
  const textContent = await targetElement?.$eval(
    selector,
    (el) => el.outerHTML
  );

  return textContent;
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
  const targetElements = await page.$$("#all_roster>div>table>tbody>tr");
  const roster = await Promise.all(
    targetElements.map(async (targetElement) => {
      const number = await getTextContent({
        targetElement: targetElement,
        selector: '[data-stat="number"]',
      });
      const player = await getTextContent({
        targetElement: targetElement,
        selector: '[data-stat="player"]',
      });
      const playerOuter = await getOuterHTML({
        targetElement: targetElement,
        selector: '[data-stat="player"]',
      });
      const playerPos = await getTextContent({
        targetElement: targetElement,
        selector: '[data-stat="pos"]',
      });
      const playerCountry = await getTextContent({
        targetElement: targetElement,
        selector: '[data-stat="birth_country"]',
      });
      const DOM = new JSDOM(playerOuter);
      const hrefPlayer = DOM.window.document.querySelector("a");
      const playerInfo = {
        number,
        player,
        playerPos,
        playerCountry,
        hrefPlayer: hrefPlayer?.href,
      };
      return playerInfo;
    })
  );

  await browser.close();
  return roster;
};

export async function POST(request: Request) {
  const { codeTeam, year } = await request.json();
  const response = await Puppeteer({ url: `${url}/${codeTeam}/${year}.html` });
  return NextResponse.json(response);
}
