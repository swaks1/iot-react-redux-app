/*eslint-disable*/
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { PropTypes } from "prop-types";

import PerfectScrollbar from "perfect-scrollbar";// javascript plugin used to create scrollbars on windows

// reactstrap components
import { Nav } from "reactstrap";

var ps;

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.sideBar = React.createRef();
    this.activeRoute.bind(this); //to have proper this context in activeRoute function
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.sideBar.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }

  componentWillUnmount() {    
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }

  linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };

  setLogoElements(logo) {
    var result = {
      logoImg: null,
      logoText: null
    };

    if (logo !== undefined) {
      if (logo.outterLink !== undefined) {
        result.logoImg = (
          <a
            href={logo.outterLink}
            className="simple-text logo-mini"
            target="_blank"
            onClick={this.props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </a>
        );
        result.logoText = (
          <a
            href={logo.outterLink}
            className="simple-text logo-normal"
            target="_blank"
            onClick={this.props.toggleSidebar}
          >
            {logo.text}
          </a>
        );
      } else {
        result.logoImg = (
          <Link
            to={logo.innerLink}
            className="simple-text logo-mini"
            onClick={this.props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </Link>
        );
        result.logoText = (
          <Link
            to={logo.innerLink}
            className="simple-text logo-normal"
            onClick={this.props.toggleSidebar}
          >
            {logo.text}
          </Link>
        );
      }
    }

    return result;
  }

  render() {
    const { bgColor, routes, logo } = this.props;
    var logoElements = this.setLogoElements(logo);
    let { logoImg, logoText } = logoElements;

    return (
      <div className="sidebar" data={bgColor}>
        <div className="sidebar-wrapper" ref={this.sideBar}>
          {logoImg !== null || logoText !== null ? (
            <div className="logo">
              {logoImg}
              {logoText}
            </div>
          ) : null}
          <Nav>
            {routes.map((prop, key) => {
              if (prop.redirect) return null;
              return (
                <li
                  className={this.activeRoute(prop.path)}
                  key={key}
                >
                  <NavLink
                    to={prop.path}
                    className="nav-link"
                    activeClassName="active"
                    onClick={this.props.toggleSidebar}
                  >
                    <i className={prop.icon} />
                    <p>{prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  bgColor: "primary",
  routes: [{}]
};

Sidebar.propTypes = {
  bgColor: PropTypes.oneOf(["primary", "blue", "green"]),
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string
  })
};

export default Sidebar;
