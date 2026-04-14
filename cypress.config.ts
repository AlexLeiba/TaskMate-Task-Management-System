import dotenv from "dotenv";
dotenv.config();
import { clerkSetup } from "@clerk/testing/cypress";
import { defineConfig } from "cypress";

export default defineConfig({
  // allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return clerkSetup({ config });
    },
    baseUrl: "http://localhost:3000",
  },
  env: {
    testUser: process.env.TEST_USER_EMAIL,
    testUserPassword: process.env.TEST_USER_PASSWORD,
  },
});
