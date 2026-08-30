import { test as base } from "@playwright/test";
import { Login_function } from "../services/loginservice";
import { getToken, setToken } from "../utils/tokenmanager";
import { initApiClient } from "../utils/apiclients";
import { Login } from "../payloads/login_payload";

export const test = base.extend({
  apiClient: [
    async ({}, use) => {
      await initApiClient();
      await use();
    },
    { scope: "worker" },
  ],
  auth: [
    async ({ apiClient }, use) => {
      const response = await Login_function(Login);

      const body = await response.json();

      setToken(body.token);

      await use({
        response,
        body,
      });
    },
    { scope: "worker" },
  ],
  token: [
    async ({ auth }, use) => {
      const token = getToken();
      await use(token);
    },
    { scope: "worker" },
  ],
});
