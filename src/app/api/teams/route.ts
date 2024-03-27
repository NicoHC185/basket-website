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

  const element = await page.$eval("#header_teams>div>.list", (el) => {
    const teams = el.querySelectorAll("table>tbody>tr");
    return [...teams].map((el) => {
      const href = el?.querySelector("td>a")?.getAttribute("href");
      const code = href?.split("/")[2].toLowerCase() || "";
      return {
        name: el.textContent,
        code,
      };
    });
  });

  await browser.close();
  return element;
};

export async function GET(request: Request) {
  const elements = await Puppeteer();
  const response = elements.map((el) => {
    const { code, ...res } = el;
    return {
      ...res,
      code: checkCode(code),
    };
  });
  return NextResponse.json({ response });
}
