import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { Container, Nav, Navbar, NavbarBrand, Form, Button, Dropdown } from 'react-bootstrap';
import logo from '../images/cozy-corner.png';
import { useEffect, useState } from 'react';
import { searchGoogleBooks } from '../utils/API';
import { useNavigate, useLocation } from 'react-router-dom';

function Navigation() {
  const [searchBooks, setSearchBooks] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setSearchInput(new URLSearchParams(location.search).get('query') || '');
  },[location.search]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        link: book.volumeInfo.infoLink,
      }));

      setSearchBooks(bookData);
      setSearchInput('');

      navigate(`/search-results?query=${searchInput}`)
    } catch (err) {
      console.error(err);
    }
  };

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
                        <Link to='/reading-preferences' className='m-2 p-2'>Preferences</Link>
                        <Link to="/me" className='m-2 p-2'>
                          Profile
                        </Link>
                        <Link to='/login' onClick={logout} className='m-2 p-2'>Logout</Link>
                    </Container>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="me-2"
                    aria-label="Search"
                    name='searchInput'
                  />
                   <Button type="submit" className="search-btn" onClick={handleFormSubmit}>Search</Button>
                </Form>
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
                <Nav className="me-2 d-flex justify-content-end">
                    <Container className="d-flex justify-content-end align-items-center">
                        <Link to='/' className='m-2 p-2'>Home</Link>
                        <Link to='/login' className='m-2 p-2'>Login</Link>
                    </Container>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="me-2"
                    aria-label="Search"
                    name='searchInput'
                  />
                  <Button type="submit" className="search-btn" onClick={handleFormSubmit}>Search</Button>
                </Form>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;