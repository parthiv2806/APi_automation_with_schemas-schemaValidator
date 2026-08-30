import { test } from "../fixtures/apifixture";
import { expect } from "@playwright/test";
import {
  validateBody,
  validateProperty,
  validateStatus,
  validateTruthy,
} from "../utils/responsevalidator";
import { invalidUsernamePayload } from "../payloads/login_payload";
import { invalidPasswordPayload } from "../payloads/login_payload";
import { bothInvalidPayload } from "../payloads/login_payload";
import { emptyUsernamePayload } from "../payloads/login_payload";
import { emptyPasswordPayload } from "../payloads/login_payload";
import { emptyCredentialsPayload } from "../payloads/login_payload";
import { missingPasswordPayload } from "../payloads/login_payload";
import { missingUsernamePayload } from "../payloads/login_payload";
import { Login_function } from "../services/loginservice";
import { Validateschema } from "../utils/schemavalidator";
import { Login_Schema } from "../schemas/loginSchema";

test("Valid login", async ({ auth }) => {
  validateStatus(auth.response, 200);
  validateTruthy(auth.body.token);
  validateProperty(auth.body, "token");
  validateBody(auth.body, {
    token: expect.any(String),
  });
  Validateschema(Login_Schema, auth.body);
});

test("Invalid Username Login", async ({ apiClient }) => {
  const response = await Login_function(apiClient, invalidUsernamePayload);

  // console.log("Status:", response.status());

  const body = await response.json();

  // console.log("Body:", body);
  validateStatus(response, 200);
  validateProperty(body, "reason");
  validateBody(body, {
    reason: "Bad credentials",
  });
  validateTruthy(body.reason);
});

test("Invalid Password Login", async ({ apiClient }) => {
  const response = await Login_function(apiClient, invalidPasswordPayload);
  // console.log("Status:", response.status());
  const body = await response.json();
  // console.log("Body:", body);
  validateStatus(response, 200);
  validateProperty(body, "reason");
  validateBody(body, {
    reason: "Bad credentials",
  });
  validateTruthy(body.reason);
});

test("Invalid Both Username & Password Login", async ({ apiClient }) => {
  const response = await Login_function(apiClient, bothInvalidPayload);
  // console.log("Status:", response.status());
  const body = await response.json();
  // console.log("Body:", body);
  validateStatus(response, 200);
  validateProperty(body, "reason");
  validateBody(body, {
    reason: "Bad credentials",
  });
  validateTruthy(body.reason);
});

test("emptyUsernamePayload", async ({ apiClient }) => {
  const response = await Login_function(apiClient, emptyUsernamePayload);
  // console.log("Status:", response.status());
  const body = await response.json();
  // console.log("Body:", body);
  validateStatus(response, 200);
  validateProperty(body, "reason");
  validateBody(body, {
    reason: "Bad credentials",
  });
  validateTruthy(body.reason);
});

test("emptyPasswordPayload", async ({ apiClient }) => {
  const response = await Login_function(apiClient, emptyPasswordPayload);
  // console.log("Status:", response.status());
  const body = await response.json();
  // console.log("Body:", body);
  validateStatus(response, 200);
  validateProperty(body, "reason");
  validateBody(body, {
    reason: "Bad credentials",
  });
  validateTruthy(body.reason);
});

test("emptyCredentialsPayload", async ({ apiClient }) => {
  const response = await Login_function(apiClient, emptyCredentialsPayload);
  // console.log("Status:", response.status());
  const body = await response.json();
  // console.log("Body:", body);
  validateStatus(response, 200);
  validateProperty(body, "reason");
  validateBody(body, {
    reason: "Bad credentials",
  });
  validateTruthy(body.reason);
});

test("missingPasswordPayload", async ({ apiClient }) => {
  const response = await Login_function(apiClient, missingPasswordPayload);
  // console.log("Status:", response.status());
  const body = await response.json();
  // console.log("Body:", body);
  validateStatus(response, 200);
  validateProperty(body, "reason");
  validateBody(body, {
    reason: "Bad credentials",
  });
  validateTruthy(body.reason);
});

test("missingUsernamePayload", async ({ apiClient }) => {
  const response = await Login_function(apiClient, missingUsernamePayload);
  // console.log("Status:", response.status());
  const body = await response.json();
  // console.log("Body:", body);
  validateStatus(response, 200);
  validateProperty(body, "reason");
  validateBody(body, {
    reason: "Bad credentials",
  });
  validateTruthy(body.reason);
});
