import { test } from "../fixtures/apifixture";
import { Partial_update } from "../payloads/partialupdatepalyload";
import { Partil_update } from "../services/partialupdateservice";
import {
  validateBody,
  validateProperty,
  validateStatus,
  validateTruthy,
} from "../utils/responsevalidator";
import { Validateschema } from "../utils/schemavalidator";
import { partialUpdateBookingSchema } from "../schemas/partialupdateschema";

test("Partial update", async ({ booking, token }) => {
  const response = await Partil_update(
    Partial_update,
    booking.bookingid,
  );

  validateStatus(response, 200);

  const body = await response.json();
  console.log(body);

  validateProperty(body, "firstname");
  validateProperty(body, "lastname");

  validateTruthy(body.firstname);
  validateTruthy(body.lastname);

  validateBody(body, {
    firstname: Partial_update.firstname,
    lastname: Partial_update.lastname,
  });

  Validateschema(partialUpdateBookingSchema, body);
});
