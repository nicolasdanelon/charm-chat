import useUserStore from "../stores/useUserStore"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"
import useChannelsStore from "../stores/useChannelsStore"

function Logout() {
  const { setUser } = useUserStore()
  const { setChannels } = useChannelsStore()
  const navigate = useNavigate()

  supabase.auth.signOut().then(() => {
    setUser(null)
    setChannels([])
    navigate("/login")
  })

  return null
}

export default Logout
