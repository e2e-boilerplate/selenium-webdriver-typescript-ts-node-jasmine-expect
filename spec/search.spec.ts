import { Builder, By, Key, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

import "chromedriver";

const baseOptions = new chrome.Options();
const chromeOptions = process.env.GITHUB_ACTIONS
  ? baseOptions.headless()
  : baseOptions;

describe("google Search", () => {
  let browser: any;

  beforeAll(async () => {
    browser = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    browser.get("https://www.google.com");
  });

  afterAll(() => {
    browser.quit();
  });

  it("should be on google search page", async () => {
    const searchBox = await browser.findElement(By.name("q"));
    await browser.wait(until.elementIsVisible(searchBox), 5000);

    const title = await browser.getTitle();
    expect(title).toEqual("Google");
  });

  it("should search for Cheese!", async () => {
    const searchBox = await browser.findElement(By.name("q"));
    expect(await searchBox.isDisplayed()).toEqual(true);
    searchBox.sendKeys("Cheese!", Key.ENTER);
  });

  it('the page title should start with "Cheese!"', async () => {
    await browser.wait(until.urlContains("search"), 5000);

    const title = await browser.getTitle();
    const words = title.split(" ");
    expect(words[0]).toEqual("Cheese!");
  });
});
