import { test } from "../fixtures/apifixture";
import { expect } from "@playwright/test";
import {
  validateBody,
  validateProperty,
  validateStatus,
  validateTruthy,
} from "../utils/responsevalidator";
test("Valid login", async ({ auth }) => {
  validateStatus(auth.response, 200);
  validateTruthy(auth.body.token);
  validateProperty(auth.body, "token");
  validateBody(auth.body, {
    token: expect.any(String),
  });
});
