import React from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar"; //javascript plugin used to create scrollbars on windows

// core components for the layout
import Navbar from "./Parts/Navbar.jsx";
import Footer from "./Parts/Footer.jsx";
import Sidebar from "./Parts/Sidebar.jsx";
import FixedPlugin from "./Parts/FixedPlugin.jsx";

import LoadingDots from '../_common/LoadingDots';
import routes from "../../routes.js";
import logo from "../../assets/img/react-logo.png";

var ps;

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/app") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
    console.log(this.props.test)
    return (
      <>
        <div className="wrapper">
          <Sidebar
            {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            logo={{
              outterLink: "https://www.creative-tim.com/",
              text: "Creative Tim",
              imgSrc: logo
            }}
            toggleSidebar={this.toggleSidebar}
          />
          <div
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
            <Navbar
              {...this.props}
              brandText={this.getBrandText(this.props.location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
            />

            {this.props.loading && <LoadingDots interval={100} dots={20} />}

            <Switch>{this.getRoutes(routes)}</Switch>
            
            {
              // we don't want the Footer to be rendered on map page
              //this.props.location.pathname.indexOf("maps") !== -1 ? null : (
              <Footer fluid />
              //)
            }
          </div>
        </div>
        <FixedPlugin
          bgColor={this.state.backgroundColor}
          handleBgClick={this.handleBgClick}
        />
      </>
    );
  }
}


DefaultLayout.propTypes = {
  loading: PropTypes.bool.isRequired
};


//props passed to the component will be automatically attached to this.props... but ownProps can be used in the function inside
let mapStateToProps = (state, ownProps) => {
  return {
    loading: state.ajaxCallsInProgress > 0 //gets redux state manipulated from ajaxStatusReducer
  }
}
let DefaultLayoutContainer = connect(mapStateToProps)(DefaultLayout); //App component is connected with redux

export default DefaultLayoutContainer;
