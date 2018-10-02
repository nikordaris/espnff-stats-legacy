import React from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";
import injectSheet from "react-jss";

const styles = theme => ({
  sidebar: {},
  navItem: {
    padding: [7, 0, 7, 0],
    color: theme.colors.white,
    fontWeight: "bold",
    margin: 0,
    "&:hover": {
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

const SideBarContainer = ({ classes, data: { loading, standings } }) => {
  if (loading) {
    return <span>loading...</span>;
  }
  return (
    <Nav vertical className={classes.sidebar}>
      {standings.map(({ teamName, wins, losses, owners, id }) => (
        <NavItem
          className={classes.navItem}
          tag={Link}
          key={id}
          to={`/team/${id}/overview`}
        >
          <div className={classes.teamName}>{teamName}</div>
          <div className={classes.owners}>{`(${wins}-${losses}) ${
            owners[0].firstName
          } ${owners[0].lastName}`}</div>
        </NavItem>
      ))}
    </Nav>
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
  injectSheet(styles)
)(SideBarContainer);
