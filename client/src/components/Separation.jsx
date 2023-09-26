import { Container, Nav } from "react-bootstrap"

function Separation() {
  return (
    <div className="pt-2 pb-2 separator">
        <Nav className="p-2">
          <Container className="d-flex justify-content-start align-items-center">
            <h2 className="d-flex justify-content-start text-light">Cozy Corner</h2>
          </Container>
        </Nav>
    </div>
  )
}

export default Separation