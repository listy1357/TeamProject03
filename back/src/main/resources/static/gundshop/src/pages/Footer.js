import React from 'react';
import { Container } from 'react-bootstrap';
import '../css/Footer.css'

function Footer() {
  return (
    <footer className="footer bg-dark text-white py-4">
      <Container>
        <p className="text-center mb-0">
          © 2024 GundShop. All rights reserved.
        </p>
        <p className="text-center mb-0">
          Follow us on:
          <a href="#" className="text-white ms-2">Twitter</a> |
          <a href="#" className="text-white ms-2">Facebook</a> |
          <a href="#" className="text-white ms-2">Instagram</a>
        </p>
      </Container>
    </footer>
  );
}

export default Footer;