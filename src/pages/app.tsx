import { h } from "preact"
import Sidebar from "../components/sidebar"
import Chats from "../components/chats"
import useUserStore from "../stores/useUserStore"

function App() {
  const { user } = useUserStore()

  return (
    <>
      <Sidebar userName={user!.name} />
      <Chats />
    </>
  )
}

export default App
