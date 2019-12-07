/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          {/* <Nav>
            <NavItem>
              <NavLink href="javascript:void(0)">Creative Tim</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="javascript:void(0)">About Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="javascript:void(0)">Blog</NavLink>
            </NavItem>
          </Nav> */}
          <div className="copyright">
            © {new Date().getFullYear()} Application for managing IoT Devices <i className="fa fa-tachometer-alt"></i>
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;
