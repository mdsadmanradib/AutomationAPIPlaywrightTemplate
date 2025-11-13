Playwright API Testing Framework (Dog API)

This project is a scalable, maintainable API testing framework built using Playwright's built-in API testing capabilities, now targeting the Dog API.

Features

Playwright Test Runner: Uses the powerful, parallel-ready Playwright test runner.

TypeScript: Fully written in TypeScript with interfaces based on the OpenAPI spec.

API Service Layer: A clean, reusable "Page Object Model" for your API (see api/ApiService.ts) separates API logic from test logic.

Configuration-based: playwright.config.ts manages different projects (e.g., 'api', 'ui') and base URLs.

Environment Variables: Uses .env files to store the BASE_URL.

Example APIs

This framework is now configured to test the Dog API:
https://dogapi.dog

It currently includes tests for:

GET /api/v2/facts (Success 200 OK)

GET /api/v2/breeds (Success 200 OK)

GET /api/v2/breeds/{id} (Success 200 OK & Failure 404)

GET /api/v2/groups (Success 200 OK)

GET /api/v2/groups/{id} (Success 200 OK & Failure 404)

⚠️ Important: Setup Required

This framework is very simple and requires no API keys.

(Optional) Proxy Setup:

If you are behind a corporate network firewall, your tests might fail (e.t., with a 401 or 500 error).

If this happens, open playwright.config.ts, uncomment the proxy block, and fill in your company's proxy server details.

Running Tests

This framework is configured with two "projects" in playwright.config.ts: api and ui.

To run only the API tests:

npm test


(This script is mapped to npx playwright test --project=api)

To run all tests (both API and UI):

npx playwright test


Viewing Test Reports

To see the beautiful HTML report after a test run, use this command:

npx playwright show-report
