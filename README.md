# ⚡⚡ Light Speed ⚡⚡

Light Speed is a modern frontend built with React + Vite to interface with the LARVIS backend service, designed to help monitor Martian ore site acquisitions via a clean and responsive UI.

---

## 🔧 Stack

- **React + Vite** (TypeScript)
- **Ant Design** – UI components
- Ant Design Plots – Powerful charts and data visualization
- **Tailwind CSS** – Utility styling
- **Redux Toolkit** – Global state management
- **Axios** – HTTP client with interceptor
- **Vitest + Testing Library** – Unit testing
- **Prettier + ESLint + Husky** – Code quality and formatting

---

## 📁 Project Structure

```bash
src/
│
├── api/              # Axios instance and API wrappers
│   ├── axios.ts
│   ├── auth.ts
│   ├── acquisitions.ts
│
├── store/            # Redux store and slices
│   ├── index.ts
│   ├── authSlice.ts
│   ├── acquisitionsSlice.ts
│
├── components/       # Reusable UI components
│   ├── ProtectedRoute.tsx
│   ├── MainLayout.tsx
│   ├── AcquisitionsChart.tsx
│
├── pages/            # Application pages
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Users.tsx (coming next)
│
├── test/             # Global testing setup (jest-dom)
├── App.tsx
├── main.tsx
```

---

## 🔑 API Usage

You can test the backend using the Postman collection here:  
👉 [LARVIS Postman Docs](https://documenter.getpostman.com/view/40741497/2sB2j3BBor)

Local server runs at: `http://localhost:8080`

### Default credentials:

- `alice / 1234`
- `bob / 1234`
- `charlie / 1234`

---

## ✅ Features implemented so far

Here's the complete and final **✅ Features Implemented** section from your README, fully cleaned up with no duplicates:

---

## ✅ Features Implemented

- [x] Axios instance with bearer token interceptor
- [x] Login API wrapper (`POST /token`)
- [x] Redux `authSlice` to manage login state and access tokens
- [x] Login form with Ant Design and error handling
- [x] Protected routing using React Router and Redux auth state
- [x] Dashboard page with ore acquisition data summary
- [x] Custom bar chart with dynamic colors using Ant Design Plots
- [x] Aggregation of acquisition data by day
- [x] API wrapper for `/acquisitions` endpoint
- [x] Manual Redux setup for acquisitions state
- [x] Axios interceptor unit test with Vitest
- [x] Pre-commit linting with ESLint, Prettier, and Husky
- [x] Local dev environment with Docker using the provided LARVIS backend

---

Let me know if you want to add badges, images/screenshots, or deploy instructions next!

---

## 🧪 Testing

| Tool                          | Purpose                                    |
| ----------------------------- | ------------------------------------------ |
| **Vitest**                    | Test runner (fast, Vite-native, like Jest) |
| **@testing-library/react**    | For component tests                        |
| **@testing-library/jest-dom** | Matchers for DOM assertions                |

Run tests with:

```bash
npm run test
```

Unit tests are written using Vitest and include:

- Axios interceptor – verifies Authorization header is correctly set / skipped

---

## ▶️ Running the project

Start backend (`larvis`):

```bash
docker build -t larvis .
docker run -p 8080:8080 larvis
```

Start frontend:

```bash
npm install
npm run dev
```

---
