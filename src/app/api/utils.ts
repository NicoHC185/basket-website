import { JSDOM } from "jsdom";
import { Page } from "puppeteer";
export const getElement = async (
  page: Page,
  selector: string
): Promise<Document> => {
  const tableElement = await page.$eval(selector, (el) => el.outerHTML);
  const tableDOM = new JSDOM(tableElement);
  const { document } = tableDOM.window;
  return document;
};
