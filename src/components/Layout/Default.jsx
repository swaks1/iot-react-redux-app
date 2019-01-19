import React from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar"; //javascript plugin used to create scrollbars on windows

// core components for the layout
import Navbar from "./Parts/Navbar.jsx";
import Footer from "./Parts/Footer.jsx";
import Sidebar from "./Parts/Sidebar.jsx";
import FixedPlugin from "./Parts/FixedPlugin.jsx";

import routes from "../../routes.js";
import logo from "../../assets/img/react-logo.png";


class DefaultLayout extends React.Component {

  constructor(props) {
    super(props);

    this.mainPanel = React.createRef(); //creating ref for the Main Panel later to add scroll
    this.ps = null;

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
      let mainPanelNode = this.mainPanel.current;
      this.ps = new PerfectScrollbar(mainPanelNode, { suppressScrollX: true });
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      this.ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }

  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.mainPanel.current.scrollTop = 0;
    }
  }

  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState((prevState) => ({ sidebarOpened: !prevState.sidebarOpened }));
  };

  // return array of routes which are possible to render
  getRoutes = routes => {
    return routes.map((prop, key) => {
      return (
        <Route
          path={prop.path}
          component={prop.component}
          key={key}
        />
      );
    });
  };

  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };

  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (this.props.location.pathname.indexOf(routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  render() {
    console.log(`Default.jsx .. ${this.props.test}`);
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
            ref={this.mainPanel}
            data={this.state.backgroundColor}
          >
            <Navbar
              {...this.props}
              brandText={this.getBrandText(this.props.location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
            />

            <div className="content">
              <Switch>{this.getRoutes(routes)}</Switch>
            </div>
            
            <Footer fluid />

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
