# ⚡⚡ Light Speed ⚡⚡

Light Speed is a modern frontend built with React + Vite to interface with the LARVIS backend service, designed to help monitor Martian ore site acquisitions via a clean and responsive UI.

---

## 🔧 Stack

- **React + Vite** (TypeScript)
- **Ant Design** – UI components
- **Ant Design Plots** – Powerful charts and data visualization
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
│   ├── users.ts
│
├── store/            # Redux store and slices
│   ├── index.ts
│   ├── authSlice.ts
│   ├── acquisitionsSlice.ts
│   ├── toastSlice.ts
│
├── components/       # Reusable UI components
│   ├── ProtectedRoute.tsx
│   ├── MainLayout.tsx
│   ├── AppHeader.tsx
│   ├── AcquisitionsChart.tsx
│
├── pages/            # Application pages
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Users.tsx
│   ├── UserDetail.tsx
│
├── test/             # Global testing setup (jest-dom)
├── App.tsx
├── main.tsx
```

---

## 🔗 Live Deployment

- 🔥 Frontend: [https://light-speed-gules.vercel.app/](https://light-speed-gules.vercel.app/)
- 🌐 Backend API: [https://light-speed-be.onrender.com](https://light-speed-be.onrender.com)

## 🔑 API Usage

You can test the backend using the Postman collection here:  
👉 [LARVIS Postman Docs](https://documenter.getpostman.com/view/40741497/2sB2j3BBor)

Local server runs at: `http://localhost:8080`

### Default credentials:

- `alice / 1234`
- `bob / 1234`
- `charlie / 1234`

---

## ✅ Features Implemented

Below is a breakdown of the main dashboard visualizations:

- 📅 **Weekly Average Ore Sites** – Shows the average number of ore sites detected per acquisition grouped by week. Helps track long-term mission trends.
- 📊 **Ore Site Count Distribution** – A histogram showing how many acquisitions fall into site-count ranges (e.g. 0–4, 5–9). Helps visualize how common low- vs. high-yield scans are.
- 📈 **Cumulative Ore Sites** – Displays the running total of ore sites over time.

Other implemented features:

- [x] Axios instance with bearer token interceptor
- [x] Login API wrapper (`POST /token`)
- [x] Redux `authSlice` to manage login state and access tokens
- [x] Login form with Ant Design and error handling
- [x] Protected routing using React Router and Redux auth state
- [x] Dashboard page with ore acquisition data summary
- [x] Custom bar chart with dynamic colors using Ant Design Plots
- [x] Aggregation of acquisition data by day
- [x] API wrapper for `/acquisitions` and `/users` endpoints
- [x] Manual Redux setup for acquisitions and toast state
- [x] `/users` page with Ant Design Table
- [x] `/users/:id` detail/edit page (with conditional form control)
- [x] Form validation and type-safe handlers
- [x] Toast messages handled via global Redux slice and `App.tsx`
- [x] Axios interceptor unit test with Vitest
- [x] Pre-commit linting with ESLint, Prettier, and Husky
- [x] Local dev environment with Docker using the provided LARVIS backend

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

Current tests include:

- Axios interceptor – verifies Authorization header is correctly set / skipped

---

## ▶️ Running the Project

### Start backend (`larvis`):

```bash
docker build -t larvis .
docker run -p 8080:8080 larvis
```

### Start frontend:

```bash
npm install
npm run dev
```

---

## 📌 Roadmap and Next Steps

- [ ] Add more unit tests for components (login, profile, users)
- [ ] Add screenshots or GIF previews of key features
- [ ] Add API improvement suggestions section in README

---
