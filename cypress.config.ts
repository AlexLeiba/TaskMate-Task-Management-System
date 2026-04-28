import dotenv from "dotenv";
dotenv.config();
import { clerkSetup } from "@clerk/testing/cypress";
import { defineConfig } from "cypress";

export default defineConfig({
  // allowCypressEnv: false,
  defaultCommandTimeout: 15000,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return clerkSetup({ config });
    },
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
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
  },
});
