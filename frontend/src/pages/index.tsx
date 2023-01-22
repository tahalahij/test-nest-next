import { useAuth } from "components/AuthProvider"
import { PageLinks } from "components/PageLinks"

export default function Home() {
  const { user } = useAuth()

  return <PageLinks />
}
