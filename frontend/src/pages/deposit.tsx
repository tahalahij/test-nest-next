import axios from "axios"
import { PageLinks } from "components/PageLinks"
import { UserStatus } from "components/UserStatus"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import { Button, Container, Form, FormText } from "react-bootstrap"
const BASE_URL = "http://localhost:3000"

export default function Deposit() {
  const [amount, setAmount] = useState<string>("1000")
  const [message, setMessage] = useState<boolean>(false)

  const [error, setError] = useState<any>()

  const [signInInProgress, setInProgress] = useState(false)
  const mounted = useRef<boolean>()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (amount) {
      try {
        setInProgress(true)
        let token = ""
        const signedInUser = window.sessionStorage.getItem("user")
        if (signedInUser) {
          token = JSON.parse(signedInUser).token
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

        const { data } = await axios.post(BASE_URL + "/deposit", {
          amount,
        })
        setMessage(true)

        router.push("/transactions")
      } catch (error) {
        console.log(error)
        if (mounted.current) {
          setError(error.message)
          setInProgress(false)
        }
      }
    } else {
      console.log("amount is empty")
    }
  }

  return (
    <div>

      <PageLinks />

      <Container>
        {message ? (
          <Container>
            <FormText>Your balance updated successfully</FormText>
          </Container>
        ) : null}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>
              Amount:
              <Form.Control
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Label>
          </Form.Group>

          <Button type="submit">Submit</Button>
        </Form>
        {error ? (
          <Container>
            <FormText>Sign in error:</FormText>
            <p>{error}</p>
          </Container>
        ) : null}
      </Container>
    </div>
  )
}

Deposit.requireAuth = true
