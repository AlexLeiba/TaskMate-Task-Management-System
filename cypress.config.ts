import dotenv from "dotenv";
dotenv.config();
import { clerkSetup } from "@clerk/testing/cypress";
import { defineConfig } from "cypress";

export default defineConfig({
  // allowCypressEnv: false,
  defaultCommandTimeout: 15000,
  requestTimeout: 15000,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return clerkSetup({ config }); // fetch test token from clerk api
    },
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
  },
  retries: {
    runMode: 2,
    openMode: 2,
  },

  env: {
    testUser: process.env.TEST_USER_EMAIL,
    testUserPassword: process.env.TEST_USER_PASSWORD,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    supportFile: "cypress/support/component.ts",
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
  },
});
