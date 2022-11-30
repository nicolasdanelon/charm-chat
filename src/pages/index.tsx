import useUserStore from "../stores/useUserStore"
import { Navigate } from "react-router-dom"

export default function Index() {
  const { user } = useUserStore()

  const uri = user?.id ? "/app" : "/login"

  return <Navigate to={uri} replace />
}
