import { test } from "../fixtures/apifixture";
import { Delete_function } from "../services/deleteBokingservice";

import { validateStatus, validateTruthy } from "../utils/responsevalidator";

test("Delete booking", async ({ booking, token }) => {
  const response = await Delete_function(booking.bookingid);

  validateStatus(response, 201);
  validateTruthy(response);
});
