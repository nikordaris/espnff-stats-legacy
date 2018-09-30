import React from "react";
import injectSheet from "react-jss";
import { Helmet } from "react-helmet";
import { Navbar, NavbarBrand, Container, Col, Row } from "reactstrap";

import SideBar from "./SideBarContainer";
import logo from "./espn-ff-logo.png";

const styles = theme => ({
  root: { height: "100vh" },
  navbar: {
    backgroundColor: "#0db04b"
  },
  navTitle: {
    color: "white !important",
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "bold",
    fontSize: 24,
    textTransform: "uppercase"
  },
  brand: {
    color: "white !important",
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
    height: "100vh",
    backgroundColor: "#1f1f1f",
    padding: 0
  },
  mainContainer: {},
  content: {
    backgroundColor: "#1f1f1f"
    // backgroundImage: "linear-gradient(to left, #0db04b, #1f1f1f)"
  }
});

const Layout = ({ classes, children }) => {
  return (
    <div className={classes.root}>
      <Helmet>
        <title>FF Stats</title>
      </Helmet>
      <Navbar className={classes.navbar}>
        <NavbarBrand className={classes.brand}>
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
          <Col md={3} className={classes.sidebarContainer}>
            <SideBar />
          </Col>
          <Col md={9} className={classes.content}>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default injectSheet(styles)(Layout);
