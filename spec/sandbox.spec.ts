import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

import "chromedriver";

const options = new chrome.Options();
const chromeOptions = process.env.GITHUB_ACTIONS ? options.headless() : options;

describe("Sandbox", () => {
  let browser: any;

  beforeAll(async () => {
    browser = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    await browser.get("https://e2e-boilerplates.github.io/sandbox/");
  }, 30000);

  afterAll(() => {
    browser.quit();
  });

  it("should be on Sandbox", async () => {
    const title = await browser.getTitle();
    const header = await browser.findElement(By.css("h1"));

    expect(title).toEqual("Sandbox");
    expect(await header.getText()).toEqual("Sandbox");
  });
});
