import useUserStore from "../stores/useUserStore"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"

function Logout() {
  const { setUser } = useUserStore()
  const navigate = useNavigate()

  supabase.auth.signOut().then(() => {
    setUser(null)
    navigate("/login")
  })

  return null
}

export default Logout
