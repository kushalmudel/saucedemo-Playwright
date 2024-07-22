import { test, expect } from "@playwright/test";

//grouping all login related tests
test.describe("Login tests", () => {
  //this will run before each test cases
  test.beforeEach(async ({ page }) => {
    //navigate to the login page and verifying page title
    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveTitle("Swag Labs");
  });

  test(" Test case 1 Success: Valid username and password", async ({
    page,
  }) => {
    //enter valid username and password
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");

    //click the login button
    await page.locator("#login-button").click();

    //verify the URL after successful login
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Test case 2 Failure: Username and password empty submission", async ({
    page,
  }) => {
    //click the login button with empty submission
    await page.locator("#login-button").click();

    //check if the error message is visible
    const errorMsg = page.locator("h3[data-test='error']");
    await expect(errorMsg).toBeVisible();

    //verify the error message text
    const expectedErrorMsg = "Epic sadface: Username is required";
    await expect(errorMsg).toHaveText(expectedErrorMsg);
  });

  test("Test case 3 Failure: Valid username invalid password", async ({
    page,
  }) => {
    //enter valid username and invalid password
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauces");

    //click the login button
    await page.locator("#login-button").click();

    //check if the error message is visible
    const errorMsg = page.locator("h3[data-test='error']");
    await expect(errorMsg).toBeVisible();

    //verify the error message text
    const expectedErrorMsg =
      "Epic sadface: Username and password do not match any user in this service";
    await expect(errorMsg).toHaveText(expectedErrorMsg);
  });

  test("Test case 4 Failure: Invalid username valid password", async ({
    page,
  }) => {
    //enter invalid username and valid valid password
    await page.locator("#user-name").fill("standard_users");
    await page.locator("#password").fill("secret_sauce");

    //click the login button
    await page.locator("#login-button").click();

    //check if the error message is visible
    const errorMsg = page.locator("h3[data-test='error']");
    await expect(errorMsg).toBeVisible();

    //verify the error message text
    const expectedErrorMsg =
      "Epic sadface: Username and password do not match any user in this service";
    await expect(errorMsg).toHaveText(expectedErrorMsg);
  });

  test("Test case 5 Failure: Invalid username and password", async ({
    page,
  }) => {
    //enter both invalid username and password
    await page.locator("#user-name").fill("standard_users");
    await page.locator("#password").fill("secret_sauces");

    //click the login button
    await page.locator("#login-button").click();

    //check if the error message is visible
    const errorMsg = page.locator("h3[data-test='error']");
    await expect(errorMsg).toBeVisible();

    //verify the error message text
    const expectedErrorMsg =
      "Epic sadface: Username and password do not match any user in this service";
    await expect(errorMsg).toHaveText(expectedErrorMsg);
  });
});
