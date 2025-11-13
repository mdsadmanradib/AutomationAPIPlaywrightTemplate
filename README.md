# 🐶 Playwright API Testing Framework (Dog API)

This project is a **scalable, maintainable API testing framework** built using **Playwright’s built-in API testing capabilities**, now targeting the **Dog API**.

---

## 🚀 Features

- **Playwright Test Runner:** Uses Playwright’s powerful, parallel-ready test runner.  
- **TypeScript:** Fully written in TypeScript with interfaces based on the OpenAPI spec.  
- **API Service Layer:** A clean, reusable *“Page Object Model”* for your API (see `api/ApiService.ts`) separates API logic from test logic.  
- **Configuration-based:** `playwright.config.ts` manages different projects (e.g., `api`, `ui`) and base URLs.  
- **Environment Variables:** Uses `.env` files to store the `BASE_URL`.

---

## 🧩 Example APIs

This framework is configured to test the **Dog API**:  
🔗 [https://dogapi.dog](https://dogapi.dog)

It currently includes tests for:

| Endpoint | Description | Expected Response |
|-----------|--------------|------------------|
| `GET /api/v2/facts` | Retrieve dog facts | ✅ 200 OK |
| `GET /api/v2/breeds` | Retrieve all breeds | ✅ 200 OK |
| `GET /api/v2/breeds/{id}` | Retrieve breed by ID | ✅ 200 OK / ❌ 404 Not Found |
| `GET /api/v2/groups` | Retrieve all groups | ✅ 200 OK |
| `GET /api/v2/groups/{id}` | Retrieve group by ID | ✅ 200 OK / ❌ 404 Not Found |

---

## ⚙️ Setup Required

This framework is very simple and requires **no API keys**.

### (Optional) Proxy Setup

If you are behind a **corporate network firewall**, your tests might fail (e.g., with `401` or `500` errors).  
If this happens:

1. Open `playwright.config.ts`
2. Uncomment the proxy block  
3. Fill in your company’s proxy server details.

---

## 🧪 Running Tests

This framework is configured with two "projects" in `playwright.config.ts`:  
- `api`  
- `ui`

### ▶️ To run only API tests:
```bash
npm test
