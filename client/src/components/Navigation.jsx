import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { Container, Nav, Navbar, NavbarBrand } from 'react-bootstrap';

function Navigation() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  
  if (Auth.loggedIn()) {
    return (
      <>
        <Link to="/">
          Home
        </Link>
        <Link to="/me">
          {Auth.getProfile().data.username}&lsquo;s profile
        </Link>
        <button onClick={logout}>
          Logout
        </button>
      </>
    );
  }
  // If logged out show login controls
  return (
    <>
      {/* <Link to="/">
        Home
      </Link>
      <Link to="/login">
        Login
      </Link>
      <Link to="/signup">
        Signup
      </Link> */}

      <Navbar expand="lg" className="navbar">
        <Container className='d-flex m-2'>
            <NavbarBrand>
                <Link to='/'>
                    <h2 className="nav-logo fw-bold fs-3">Cozy Corner</h2>
                </Link>
            </NavbarBrand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-2 d-flex justify-content-between">
                    <Container className="d-flex justify-content-end align-items-center">
                        <Link to='/' className='m-2 p-2'>Home</Link>
                        <Link to='/about' className='m-2 p-2'>About</Link>
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