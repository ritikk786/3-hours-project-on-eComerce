import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";       

const Header = ()=>{
    return(
        <header>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Candy Store</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Button>Cart</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </header>
    )
}
export default Header;