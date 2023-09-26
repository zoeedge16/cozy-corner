import { Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <Nav className="me-auto footer">
        <Container>
            <Container className='d-flex justify-content-center mt-4 mb-4'>
                <Link to='/' className='footer-link' style={{ margin: "0 4px" }}>Home</Link>
                <Link to='/about' className='footer-link' style={{ margin: "0 4px" }} id='footer-link'>About</Link>
                <Link to='/login' className='footer-link' style={{ margin: "0 4px" }} id='footer-link'>Login</Link>
            </Container>
            <Container className='pb-5'>
                <p className='d-flex justify-content-center text-light m-4'>
                  Trying to get into the habit of reading can be difficult 
                  especially without accountability buddies. Cozy corner is here 
                  to help! Cozy corner is your way to connect not only to new 
                  worlds but also fellow readers that want to discuss and 
                  connect through the power of literature. Start by picking your 
                  favorite genres and answering a few questions on how often 
                  you would like to read and cozy corner will do the rest.</p>
            </Container>
        </Container>
    </Nav>
  )
}

export default Footer