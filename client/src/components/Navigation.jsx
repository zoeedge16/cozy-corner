import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import logo from '../images/cozy-corner.png';

function Navigation() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  
  if (Auth.loggedIn()) {
    return (
      <>
        <Navbar expand="lg" className="navbar">
        <Container className='d-flex m-2'>
            <NavbarBrand>
                <Link to='/'>
                  <img src={logo} alt="logo" className='img-fluid logo-img' />
                </Link>
            </NavbarBrand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-2 d-flex justify-content-between">
                    <Container className="d-flex justify-content-end align-items-center">
                        <Link to='/' className='m-2 p-2'>Home</Link>
                        <Link to="/me" className='m-2 p-2'>
                          Profile
                        </Link>
                        <Link to='/login' onClick={logout} className='m-2 p-2'>Logout</Link>
                    </Container>
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
    );
  }
  // If logged out show login controls
  return (
    <>
      <Navbar expand="lg" className="navbar">
        <Container className='d-flex m-2'>
            <NavbarBrand>
                <Link to='/'>
                  <img src={logo} alt="logo" className='img-fluid logo-img' />
                </Link>
            </NavbarBrand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-2 d-flex justify-content-between">
                    <Container className="d-flex justify-content-end align-items-center">
                        <Link to='/' className='m-2 p-2'>Home</Link>
                        <Link to='/login' className='m-2 p-2'>Login</Link>
                    </Container>
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;