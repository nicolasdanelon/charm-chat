import { h } from "preact"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/layout"
import App from "./pages/app"
import Login from "./pages/login"
import Authenticated from "./components/authenticated"
import NotAuthenticated from "./components/not-authenticated"
import Logout from "./pages/logout"
import Index from "./pages"

export function Root() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Index />} />
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
