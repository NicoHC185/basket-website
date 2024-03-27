import axios from "axios";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer-extra";
import Adblocker from "puppeteer-extra-plugin-adblocker";
import UserAgent from "user-agents";

import { JSDOM } from "jsdom";

const url = `https://www.basketball-reference.com/leagues/`;

function checkCode(code?: string) {
  if (code === "cho") {
    return "cha";
  }
  return code;
}

const getTeamsByHTML = (el: Document) => {
  const conference = el.querySelector("h4")?.textContent;
  const teamsElements = el.querySelectorAll("table>tbody>tr");
  const teams = [...teamsElements].map((el) => {
    const href = el?.querySelector("td>a")?.getAttribute("href");
    const code = href?.split("/")[2].toLowerCase() || "";
    const regex = /\(|\)/g;
    const textContentSplit =
      el?.textContent?.replace("F$", "").replace(regex, "-").split("-") || [];
    const name = textContentSplit[0];
    const victories = textContentSplit[1];
    const defeats = textContentSplit[2];
    return {
      name,
      victories,
      defeats,
      code: checkCode(code),
    };
  });
  return {
    conference,
    teams,
  };
};

const Puppeteer = async () => {
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
  await page.hover("#header_teams");

  const elements = await page.$$eval(
    "#header_teams>div>.list",
    (el: Element[]) => el.map((item) => item.outerHTML)
  );
  const res = elements.map((el) => {
    const DOM = new JSDOM(el);
    return getTeamsByHTML(DOM.window.document);
  });

  await browser.close();
  return res;
};

export async function GET(request: Request) {
  const response = await Puppeteer();
  return NextResponse.json({ response });
}
