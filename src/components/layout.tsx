import { Outlet } from "react-router-dom"

function layout() {
  return (
    <div className="font-sans antialiased h-screen flex">
      <Outlet />
    </div>
  )
}

export default layout
