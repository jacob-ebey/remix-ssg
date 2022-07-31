import { test, expect } from "@playwright/test";

test("renders 404 page", async ({ page }) => {
  await page.goto("/__does_not_exist__");

  await expect(page).toHaveTitle(/Remix SSG/);

  const fourOhFour = page.locator("p text=404");
  await expect(fourOhFour).toBeDefined();
});

test("renders welcome page", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Remix SSG/);

  const title = page.locator("h1 text=Remix SSG");
  await expect(title).toBeDefined();

  const docsLink = page.locator("a", { hasText: "READ THE DOCS" });
  await expect(docsLink).toHaveAttribute("href", "/docs");
});

test("renders docs page", async ({ page }) => {
  await page.goto("/docs");

  await expect(page).toHaveTitle(/Remix SSG/);

  const title = page.locator("h1 text=How this works");
  await expect(title).toBeDefined();
});

test("renders quick-start docs page", async ({ page }) => {
  await page.goto("/docs/quick-start");

  await expect(page).toHaveTitle(/Remix SSG/);

  const title = page.locator("h1 text=Quick Start");
  await expect(title).toBeDefined();
});

test("allows navigating around", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const docsLink = page.locator("a", { hasText: "READ THE DOCS" });
  await expect(docsLink).toHaveAttribute("href", "/docs");
  await docsLink.click();

  let title = page.locator("h1 text=How this works");
  await expect(title).toBeDefined();
  const quickStartLink = page.locator("a[href='/docs/quick-start']").first();
  await quickStartLink.click();

  title = page.locator("h1 text=Quick Start");
  await expect(title).toBeDefined();
});
