import { h, ComponentChildren, JSX } from "preact"
import { Navigate } from "react-router-dom"
import useUserStore from "../stores/useUserStore"

type AuthenticatedProps = {
  children: ComponentChildren
}

function NotAuthenticated({ children }: AuthenticatedProps): JSX.Element {
  const { user } = useUserStore()

  return user?.id ? <Navigate to="/app" replace /> : <>{children}</>
}

export default NotAuthenticated
