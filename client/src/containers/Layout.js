import React from "react";
import injectSheet from "react-jss";
import SideBar from "./SideBarContainer";

const styles = theme => ({
  root: {},
  sidebarContainer: {},
  mainContainer: {}
});

const Layout = ({ classes, children }) => {
  return (
    <div className={classes.root}>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">ESPN Fantasy Football Stats</NavbarBrand>\
      </Navbar>
      <Container fluid>
        <Row>
          <Col className={classes.sidebarContainer}>
            <SideBar />
          </Col>
          <Col className={classes.mainContainer}>{children}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default injectSheet(styles)(Layout);
