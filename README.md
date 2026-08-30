# API Automation with JSON Schema Validation

This project automates the **[Restful Booker](https://restful-booker.herokuapp.com)** API using **Playwright Test** for API testing. It implements a clean, layered architecture with **JSON Schema validation** (via `ajv`) on every response, alongside a shared token/token-management flow reused across authenticated operations.

## What it covers

The suites cover the core Restful Booker booking workflow:

| Test file | Endpoint(s) | Status |
|-----------|-------------|--------|
| `1-login.spec.js` | `POST /auth` | ✅ 9 tests |
| `2-Cretae_booking.spec.js` | `POST /booking` | ✅ 16 tests |
| `3-Get_booking.spec.js` | `GET /booking/:id` | ✅ 1 test |
| `4-partialupdate.spec.js` | `PATCH /booking/:id` | ✅ 1 test |
| `5-fullupdate.spec.js` | `PUT /booking/:id` | ✅ 1 test |
| `6-deletebooking.spec.js` | `DELETE /booking/:id` | ✅ 1 test |

**Total: 29 tests (all passing)**

## Tech stack

- **Node.js** + **Playwright Test** (`@playwright/test`) — test runner & API client
- **ajv** — JSON Schema validation
- **ES Modules** — all source files use `import`/`export`

## Project structure

```
.
├── fixtures/               # Playwright custom fixtures (apiClient, auth, token, booking)
├── payloads/               # Request body data for every scenario
├── schemas/                # JSON Schemas for response validation
├── services/               # One service function per endpoint
├── tests/                  # Test spec files (1-login ... 6-deletebooking)
├── utils/                  # Shared helpers (API client, token manager, validators)
├── playwright.config.js    # Playwright configuration
└── package.json
```

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Install Playwright (API testing needs no browsers, but Playwright itself)
npx playwright install
```

## Run the tests

```bash
# Run all tests
npx playwright test

# Run a specific suite
npx playwright test tests/1-login.spec.js
npx playwright test tests/4-partialupdate.spec.js tests/5-fullupdate.spec.js

# Run a single test by title
npx playwright test -g "Delete booking"
```

## Architecture

The project is split into clean, reusable layers:

- **`utils/tokenmanager.js`** — module-level token store (`setToken` / `getToken` / `clearToken`).
- **`utils/apiclients.js`** — low-level HTTP helpers (`get`, `post`, `patch`, `put`, `remove`). The authenticated methods (`patch`, `put`, `remove`) automatically attach the `Cookie: token=<token>` header from `getToken()`. The token is obtained from the login flow (see below).
- **`services/*.js`** — one thin function per endpoint; services call the API client and return the raw Playwright `APIResponse`.
- **`payloads/*.js`** — all request bodies (valid + negative scenarios).
- **`schemas/*.js`** — JSON Schemas describing the expected response shape.
- **`utils/schemavalidator.js`** — `Validateschema(schema, response)` compiles a schema with `ajv` and throws if the response doesn't match.
- **`utils/responsevalidator.js`** — thin `expect` wrappers: `validateStatus`, `validateProperty`, `validateBody`, `validateTruthy`, `validateTextBody`.

### Token flow (authenticated endpoints)

```
test { booking, token }
  -> token fixture -> auth fixture -> POST /auth -> setToken(body.token)
  -> services call patch/put/remove on apiclients
  -> apiclients reads getToken() and sends  Cookie: token=<token>
```

Restful Booker requires the login token to be sent as the **`Cookie: token=<token>`** header for `PATCH` / `PUT` / `DELETE` (sending `Authorization: Basic <token>` returns `403`).

### Example: a test with schema validation

```js
import { test } from "../fixtures/apifixture";
import { Create_booking } from "../services/create_bookingService";
import { Validateschema } from "../utils/schemavalidator";
import { createBookingSchema } from "../schemas/CreateBookingSchema";
import { validateStatus } from "../utils/responsevalidator";

test("Create booking", async ({ booking }) => {
  validateStatus(booking.response, 200);
  Validateschema(createBookingSchema, booking.body);
});
```

## Configuration highlights

`playwright.config.js`:

- `testDir: "./tests"` — all specs live in `tests/`
- `workers: 1` and `fullyParallel: false` — sequential execution (shared booking/token state)
- `reporter: "html"` — human-readable HTML report
- `trace: "on-first-retry"` — captures a trace when a test retries

## Troubleshooting

- **File casing errors on Windows** — if you see *"...differs from already included file name...only in casing"*, rename the file (e.g. temporarily `fullupdatePayload.js` → `fullupdatepayloadTMP.js` → back) so the filesystem records the correct case, then restart the TypeScript server in your editor.

## Repository

https://github.com/parthiv2806/APi_automation_with_schemas-schemaValidator
