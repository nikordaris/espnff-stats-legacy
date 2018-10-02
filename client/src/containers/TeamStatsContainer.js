import React from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Jumbotron
} from "reactstrap";
import injectSheet from "react-jss";

import TeamStatsOverview from "../components/TeamStatsOverview";

const views = {
  overview: TeamStatsOverview
};

const styles = theme => ({
  tabNav: {
    // borderBottomColor: `${theme.colors.gray900} !important`
    borderBottom: "none",
    paddingTop: 5
  },
  tab: {
    color: theme.colors.white
  },
  tabLink: {
    "&.active, &.active:hover": {
      backgroundColor: `${theme.colors.green500} !important`,
      color: `${theme.colors.tertiary} !important`,
      border: `solid thin ${theme.colors.green500} !important`,
      borderBottom: `0 !important`,
      backgroundImage: "none"
    },
    "&:hover": {
      border: `solid thin ${theme.colors.tertiary} !important`
    },
    color: `${theme.colors.white} !important`,
    // border: `${theme.colors.secondary} !important`,
    backgroundImage: `linear-gradient(${theme.colors.gray500}, ${
      theme.colors.gray1000
    })`,
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 12,
    textTransform: "capitalize"
  },
  tabContent: {
    padding: 15,
    backgroundImage: `linear-gradient(${theme.colors.green500}, ${
      theme.colors.secondary
    })`
  }
});

const TeamStatsOverviewContainer = ({
  classes,
  teamId,
  view,
  data: { loading, teamStats }
}) => {
  if (loading) {
    return <span>loading...</span>;
  }
  return (
    <div>
      <Nav tabs className={classes.tabNav}>
        {Object.keys(views).map(viewKey => (
          <NavItem key={`${viewKey}-nav`} className={classes.tab}>
            <NavLink
              tag={Link}
              className={classes.tabLink}
              active={view === viewKey}
              to={`/team/${teamId}/${viewKey}`}
            >
              {viewKey}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent className={classes.tabContent} activeTab={view}>
        {Object.keys(views).map(viewKey => {
          const View = views[viewKey];
          return (
            <TabPane key={`${viewKey}-tab`} tabId={viewKey}>
              <View teamStats={teamStats} />
            </TabPane>
          );
        })}
      </TabContent>
    </div>
  );
};

const query = gql`
  query TeamStatsQuery($id: ID!) {
    teamStats(id: $id) {
      id
      scoringPeriodId
      pointsFor
      pointsAgainst
      teamName
      optimalPoints
      benchPointsFor
      totalOptimal
      totalFor
      totalBench
      totalAgainst
      seasonAvgOptimal
      seasonLowOptimal
      seasonHighOptimal
      last3AvgOptimal
      last3AvgFor
      scoringDifferential
      efficiency
      totalEfficiency
      seasonStdDevPF
      totalDifferential
      totalCoachRating
    }
  }
`;

export default compose(
  graphql(query, {
    options: props => ({ variables: { id: props.teamId } })
  }),
  injectSheet(styles)
)(TeamStatsOverviewContainer);
