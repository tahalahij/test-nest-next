import { useAuth } from "components/AuthProvider"
import { PageLinks } from "components/PageLinks"
export function UserStatus() {
  const { user } = useAuth()

  return (
    <div>

      <div>
        {user ? (
          <div>
            <p>email: {user.email}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
