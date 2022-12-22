import Lottie from "lottie-react"
import useUserStore from "../stores/useUserStore"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"
import useChannelsStore from "../stores/useChannelsStore"
import loadingAnimation from "../assets/loading-animation.json"

function Logout() {
  const { setUser } = useUserStore()
  const { clearChannels } = useChannelsStore()
  const navigate = useNavigate()

  supabase.auth.signOut().then(() => {
    setUser(null)
    clearChannels()
    navigate("/login")
  })

  return (
    <div className="flex flex-col px-6 py-4 flex-1">
      <div className="grid place-items-center">
        <Lottie loop={true} autoplay={true} animationData={loadingAnimation} />
        <em>closing your session...</em>
      </div>
    </div>
  )
}

export default Logout
