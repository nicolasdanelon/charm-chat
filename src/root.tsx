import { Routes, Route, useNavigate } from "react-router-dom"
import Layout from "./components/layout"
import App from "./pages/app"
import Login from "./pages/login"
import { h } from "preact"
import Authenticated from "./components/authenticated"
import NotAuthenticated from "./components/not-authenticated"
import Logout from "./pages/logout"

export function Root() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="/app"
          element={
            <Authenticated>
              <App />
            </Authenticated>
          }
        />
      </Route>
      <Route
        path="/login"
        element={
          <NotAuthenticated>
            <Login />
          </NotAuthenticated>
        }
      />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  )
}
