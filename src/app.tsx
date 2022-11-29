import { Routes, Route } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./pages/home"
import Login from "./pages/login"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}
