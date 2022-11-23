import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  )
}
