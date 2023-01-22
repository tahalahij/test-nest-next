import axios from "axios"
import List from "pages/List"
import { PageLinks } from "components/PageLinks"
import { UserStatus } from "components/UserStatus"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { Button, Container, Form, FormText } from "react-bootstrap"

const BASE_URL = "http://localhost:3000"

export default function Deposit() {
  const [list, setList] = useState<any[]>([])

  const [error, setError] = useState<any>()

  const mounted = useRef<boolean>()
  const router = useRouter()

  const getTransactions = async () => {
    try {
      let token = ""
      const signedInUser = window.sessionStorage.getItem("user")
      if (signedInUser) {
        token = JSON.parse(signedInUser).token
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      const { data } = await axios.get(BASE_URL + "/transactions")

      console.log(data)
      setList(data)
    } catch (error) {
      console.log(error)
      if (mounted.current) {
        setError(error.message)
      }
    }
  }

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <div>
      <PageLinks />

      <Container>
        <List items={list} />
        {error ? (
          <Container>
            <FormText>Error:</FormText>
            <p>{error}</p>
          </Container>
        ) : null}
      </Container>
    </div>
  )
}

Deposit.requireAuth = true
