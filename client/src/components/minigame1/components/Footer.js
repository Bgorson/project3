import React from "react"
import Navbar from 'react-bootstrap/Navbar'
function Footer() {
    return(
        <Navbar sticky="bottom" bg="dark" variant="dark">
        <Navbar.Brand href="https://bgorson.github.io"target="_blank">
          {' Clicky Game Built by Brandon Gorson'}
        </Navbar.Brand>
      </Navbar>
    )
}
export default Footer;