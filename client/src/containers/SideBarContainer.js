import React from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Nav, NavItem, Collapse, NavbarToggler } from "reactstrap";
import injectSheet from "react-jss";
import { withRouter } from "react-router";

const styles = theme => ({
  sidebar: {},
  navItem: {
    padding: [7, 0, 7, 0],
    color: theme.colors.white,
    fontWeight: "bold",
    margin: 0,
    "&:hover, &.active": {
      backgroundImage: `linear-gradient(to right, ${theme.colors.red}, ${
        theme.colors.black
      })`,
      color: theme.colors.white,
      textDecoration: "none"
    }
  },
  teamName: {
    padding: [0, 15, 0, 15]
  },
  owners: {
    padding: [0, 15, 0, 15],
    fontWeight: "normal",
    position: "relative",
    top: -2,
    color: theme.colors.gray,
    fontSize: 12
  }
});

const SideBarContainer = ({
  classes,
  location,
  collapsed,
  toggleSidebar,
  data: { loading, standings }
}) => {
  if (loading) {
    return <span>loading...</span>;
  }
  const teamMatch = /\/team\/(.*)\/.*/.exec(location.pathname);
  const teamId = teamMatch ? teamMatch[1] : undefined;
  return (
    <Collapse isOpen={!collapsed} navbar>
      <Nav vertical className={classes.sidebar} navbar>
        {standings.map(({ teamName, wins, losses, owners, id }) => (
          <NavItem
            className={classes.navItem}
            tag={Link}
            key={id}
            active={teamId == id} // eslint-disable-line
            onClick={toggleSidebar}
            to={{
              ...location,
              pathname: location.pathname.includes("/team/")
                ? location.pathname.replace(/\/team\/\d+\//, `/team/${id}/`)
                : `/team/${id}/`
            }}
          >
            <div className={classes.teamName}>{teamName}</div>
            <div className={classes.owners}>{`(${wins}-${losses}) ${
              owners[0].firstName
            } ${owners[0].lastName}`}</div>
          </NavItem>
        ))}
      </Nav>
    </Collapse>
  );
};

const query = gql`
  {
    standings {
      id
      teamName
      teamAbbrev
      divisionName
      wins
      losses
      streakLength
      streakType
      pointsFor
      pointsAgainst
      divisionStanding
      overallStanding
      owners {
        id
        firstName
        lastName
      }
    }
  }
`;

export default compose(
  graphql(query),
  injectSheet(styles),
  withRouter
)(SideBarContainer);
