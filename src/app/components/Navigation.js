"use client"
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CartState } from '../../../context/CartContext';
import { usePathname } from 'next/navigation';


function Navigation() {
  const {cart} = CartState();
  const pathname = usePathname();

  // Define the routes where the cart link should not be displayed
  const hiddenRoutes = ['/dashboard'];

  // Check if the current route is in the list of routes to hide the cart link
  const shouldHideCartLink = hiddenRoutes.includes(pathname);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link className="navbar-brand" href="/">SimplyShop</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" href="/login">Login</Link>
            {/* <Link className="nav-link" href="/shop">Shop</Link> */}
            <Link className="nav-link" href="/products">Products</Link>
            <Link className="nav-link" href="/dashboard">Dashboard</Link>
          </Nav>
          <Nav>
            {!shouldHideCartLink && (
              <Link className="nav-link" href="/cart">
                Cart: ({cart.length})
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;