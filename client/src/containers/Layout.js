import React from "react";
import injectSheet from "react-jss";
import { Helmet } from "react-helmet";
import {
  Navbar,
  NavbarBrand,
  Container,
  Col,
  Row,
  NavbarToggler
} from "reactstrap";
import { withRouter } from "react-router";
import { compose } from "react-apollo";
import classnames from "classnames";
import { MobileView, BrowserView } from "react-device-detect";

import MobileNavContainer from "./MobileNavContainer";
import SideBar from "./SideBarContainer";
import logo from "./espn-ff-logo.png";

const styles = theme => ({
  root: { minHeight: "100vh" },
  navbar: {
    backgroundColor: theme.colors.primary
  },
  navTitle: {
    color: `${theme.colors.white} !important`,
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 24,
    textTransform: "uppercase"
  },
  brand: {
    composes: ["mr-auto"],
    color: `${theme.colors.white} !important`,
    margin: 0,
    padding: 0,
    // display: "inline"
    "@global div+div": {
      display: "inline !important"
    }
  },
  brandName: {
    fontSize: 24,
    fontWeight: "bold",
    position: "relative",
    top: -5,
    paddingLeft: 15,
    "@global span+span": {
      display: "block",
      fontSize: 12,
      position: "absolute",
      left: 30,
      top: 25,
      fontFamily: "verdana"
    }
  },
  brandLogo: {
    display: "inline"
  },
  sidebarContainer: {
    minHeight: "100vh",
    backgroundColor: theme.colors.secondary,
    padding: 0
  },
  mainContainer: {
    color: theme.colors.white,
    minHeight: "100vh"
  },
  content: {
    minHeight: "100vh",
    paddingTop: 3,
    backgroundColor: theme.colors.secondary
    // backgroundImage: "linear-gradient(to left, #0db04b, #1f1f1f)"
  },
  toggler: {
    composes: ["mr-2", "navbar-dark"],
    padding: 0
  }
});

class Layout extends React.Component {
  state = {
    collapsed: false
  };

  componentDidMount() {
    const { location } = this.props;
    console.log(location.pathname);
    let collapsed = window.innerWidth <= 767;
    if (window.innerWidth <= 767 && location.pathname === "/") {
      collapsed = false;
    }
    this.setState({ collapsed });
  }

  toggleSidebar = () => {
    if (window.innerWidth <= 767) {
      this.setState({ collapsed: !this.state.collapsed });
    }
  };

  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>FF Stats</title>
        </Helmet>
        <Navbar className={classes.navbar} expand="md">
          <NavbarToggler
            onClick={this.toggleSidebar}
            className={classes.toggler}
          />
          <NavbarBrand className={classnames([classes.brand])}>
            <div className={classes.brandLogo}>
              <img src={logo} width={50} />
            </div>
            <div className={classes.brandName}>
              <span>FANTASYSTATS FOOTBALL</span>
              <span>{process.env.REACT_APP_LEAGUE_NAME}</span>
            </div>
          </NavbarBrand>
        </Navbar>
        <Container fluid className={classes.mainContainer}>
          <Row>
            <Col
              sm={12}
              md={3}
              style={{ minHeight: this.state.collapsed ? "100%" : undefined }}
              className={classnames([classes.sidebarContainer])}
            >
              <MobileNavContainer
                toggleSidebar={this.toggleSidebar}
                collapsed={this.state.collapsed}
              />
            </Col>
            <Col sm={12} md={9} className={classes.content}>
              {children}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default compose(
  injectSheet(styles),
  withRouter
)(Layout);
