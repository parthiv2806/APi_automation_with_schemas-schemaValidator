import { test as base } from "@playwright/test";
import { Login_function } from "../services/loginservice";
import { getToken, setToken } from "../utils/tokenmanager";
import { initApiClient } from "../utils/apiclients";
import { Login } from "../payloads/login_payload";
import { Create_booking } from "../services/create_bookingService";
import { CreateBooking } from "../payloads/createBookingpayload";

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
      //   console.log(response);
      const body = await response.json();
      console.log(body);

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
  booking: [
    async ({ apiClient }, use) => {
      const response = await Create_booking(CreateBooking);

      const body = await response.json();
      console.log(body);
      const bookingid = body.bookingid;

      console.log("Created Booking ID:", bookingid);

      await use({
        response,
        body,
        bookingid,
      });
    },
    { scope: "worker" },
  ],
});
