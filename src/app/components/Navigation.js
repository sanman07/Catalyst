"use client"
import { useState } from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { CartState } from '../../../context/CartContext';
import { usePathname } from 'next/navigation';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Navigation() {
  const {cart} = CartState();
  const pathname = usePathname();

  const [showOffcanvas, setShowOffcanvas] = useState(false);


  // Define the routes where the cart link should not be displayed
  const hiddenRoutes = ['/dashboard'];

  // Check if the current route is in the list of routes to hide the cart link
  const shouldHideCartLink = hiddenRoutes.includes(pathname);

    // Toggle function for off-canvas
    const handleShow = () => setShowOffcanvas(true);
    const handleClose = () => setShowOffcanvas(false);
    const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);


  return (
    <>
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
              <Link className="btn btn-outline-dark" href="#" onClick={handleShow}>
                <ShoppingCartIcon /> Cart <span className='badge bg-dark text-white ms-1 rounded-pill'>{cart.length}</span>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Offcanvas show={showOffcanvas} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul className="list-group flex-grow-1">
                {cart.map((item) => (
                  <li key={item.id} className="list-group-item">
                    <div className="d-flex justify-content-between">
                      <span>{item.title}</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-end">
                <strong>Total: ${totalPrice}</strong>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Navigation;