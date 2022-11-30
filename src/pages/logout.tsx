import useUserStore from "../stores/useUserStore"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"
import useChannelsStore from "../stores/useChannelsStore"

function Logout() {
  const { setUser } = useUserStore()
  const { clearChannels } = useChannelsStore()
  const navigate = useNavigate()

  supabase.auth.signOut().then(() => {
    setUser(null)
    clearChannels()
    navigate("/login")
  })

  return null
}

export default Logout
