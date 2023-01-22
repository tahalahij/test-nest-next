import axios from "axios"
import { useAuth } from "components/AuthProvider"
import { PageLinks } from "components/PageLinks"
import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { Container, Form, Button, FormText } from "react-bootstrap"
const BASE_URL = "http://localhost:3000"

const defaultEmail = "user1@gmail.com"
const defaultPassword = "123"

export default function SignIn() {
  const { auth, initializing, getRedirect, clearRedirect, user, error } =
    useAuth()
  const [email, setEmail] = useState<string>(defaultEmail)
  const [password, setPassword] = useState<string>(defaultPassword)
  const [signInInProgress, setInProgress] = useState(false)
  const mounted = useRef<boolean>()
  const router = useRouter()

  useEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  }, [])

  useEffect(() => {
    if (!initializing) {
      if (user) {
        const redirect = getRedirect()
        if (redirect) {
          router.push(redirect)
          clearRedirect()
        } else {
          router.push("/deposit")
        }
      }
    }
  }, [router, getRedirect, clearRedirect, initializing, user])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email && password) {
      try {
        setInProgress(true)

        await axios
          .post(BASE_URL + "/auth/login", {
            email,
            password,
          })
          .then(async function ({ data }) {
            await auth.signIn(email, data.access_token)

            this.onUserChange(this.user)

            return this.user
          })
      } catch (error) {
        if (mounted.current) {
          setInProgress(false)
        }
      }
    } else {
      console.log("email or password is empty")
    }
  }

  if (initializing) {
    return <h1>Application Loading</h1>
  }
  if (signInInProgress) {
    return <h1>Signing in progress</h1>
  }

  return (
    <>
      <PageLinks />

      {!user ? ( // there is no user, show sign in form
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>
                Email:
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Label>
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>
                Password:
                <Form.Control
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </Form.Label>
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
          {error ? (
            <Container>
              <FormText>Sign in error:</FormText>
              <p>{error.message}</p>
            </Container>
          ) : null}
        </Container>
      ) : null}
    </>
  )
}
