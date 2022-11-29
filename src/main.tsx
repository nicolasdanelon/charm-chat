import { h, render } from "preact"
import { BrowserRouter } from "react-router-dom"
import { Root } from "./root"
import "./index.css"

render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>,
  document.getElementById("app") as HTMLElement
)
