import { h, ComponentChildren, JSX } from "preact"
import { Navigate } from "react-router-dom"
import { supabase } from "../supabaseClient"
import { useEffect } from "preact/compat"
import useUserStore, { User } from "../stores/useUserStore"

type AuthenticatedProps = {
  children: ComponentChildren
}

function Authenticated({ children }: AuthenticatedProps): JSX.Element {
  const { user, setUser } = useUserStore()

  useEffect(() => {
    if (!user) {
      supabase.auth.getUser().then(({ data }) => {
        const {
          user: { id, email },
        } = data as unknown as { user: User }

        const name = email?.toLowerCase().split("@")[0].split(".").join(" ")

        setUser({ id, email, name })
      })
    }
  }, [])

  return user?.id ? <>{children}</> : <Navigate to="/login" replace />
}

export default Authenticated
