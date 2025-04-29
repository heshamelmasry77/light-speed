
# ⚡⚡ Light Speed ⚡⚡

Light Speed is a modern frontend built with React + Vite to interface with the LARVIS backend service, designed to help monitor Martian ore site acquisitions via a clean and responsive UI.

---

## 🔧 Stack

- **React + Vite** (TypeScript)
- **Ant Design** – UI components
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
├── api/              # Axios instance + typed API wrappers
│   ├── axios.ts
│   ├── auth.ts
│
├── store/            # Redux store setup
│   ├── index.ts
│   ├── authSlice.ts
│
├── components/       # UI components (to come)
├── pages/            # App pages (Login, Dashboard, etc.)
├── test/             # Global test setup (jest-dom)
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

- [x] **Axios instance** with auth token interceptor
- [x] **Redux `authSlice`** to store token + userId
- [x] **Login API wrapper** (`POST /token`)
- [x] **Unit tests** for Axios interceptor
- [x] **Local dev with Docker** using provided `larvis` backend
- [x] **Prettier + ESLint + Husky** configured with pre-commit hooks

---

## 🧪 Testing

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
