import { useRouter } from "next/router"
import {
  Navbar,
  Container,
  Nav,
} from "react-bootstrap"
import { UserStatus } from "./UserStatus"

const links = [
  { text: "dashboard", route: "/" },
  { text: "deposit", route: "/deposit" },
  { text: "transactions", route: "/transactions" },
  { text: "games", route: "/games" },
  { text: "sign in", route: "/signin" },
  { text: "sign out", route: "/signout" },
]
export function PageLinks() {
  const router = useRouter()

  return (
    <Navbar bg="light" expand="lg"  className='mb-5' >
      <Container>
        <Navbar.Brand href="#home">Casino</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {links.map((link) =>
              router.route !== link.route ? (
                <Nav.Link href={link.route}>{link.text}</Nav.Link>
              ) : null
            )}
          </Nav>
          <UserStatus />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
