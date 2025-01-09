import { useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';

export default function Layout() {
  const [authToken, setAuthToken] = useLocalStorage("authToken", "");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  const handleLogout = (e) => {
    e.preventDefault();
    setAuthToken("");
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="black" variant="dark" expand="lg" className="px-3">
        <Navbar.Brand href="/mybookings" className="me-auto ms-3">
          <i className="bi bi-luggage-fill"></i> <em>Booking Apps</em>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto me-3">
            <Nav.Link
              href="/home"
              className="me-3"
            >
              <i className="bi bi-house-door-fill"> Home</i>
            </Nav.Link>
            <Nav.Link
              href="/mybookings"
              className="me-3"
            >
              <i className="bi bi-calendar-check-fill"> My Bookings</i>
            </Nav.Link>
            <Nav.Link
              href="/notification"
              className="me-3"
            >
              <i className="bi bi-bell-fill"> Notification </i>
            </Nav.Link>
            <Nav.Link
              href="/"
              className="me-3"
            >
              <i className="bi bi-person-fill"> Profile </i>
            </Nav.Link>

            {location.pathname !== '/login' && (
              <Nav.Link
                onClick={handleLogout}
                className="me-3"
              >
                <i className="bi bi-box-arrow-in-right"> Logout</i>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid className="p-0">
        <Outlet />
      </Container>
    </>
  );
}
