import React from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import TeamWeeklyTable from "../components/TeamWeeklyTable";

const TeamWeeklyTableContainer = ({ teamId, data: { loading, teamStats } }) => {
  if (loading) {
    return <div>loading...</div>;
  }
  return <TeamWeeklyTable teamStats={teamStats} teamId={teamId} />;
};

const query = gql`
  query TeamStatsQuery($id: ID!) {
    teamStats(id: $id) {
      id
      scoringPeriodId
      teamId
      pointsFor
      pointsAgainst
      benchPointsFor
      teamName
      optimalPoints
      seasonAvgFor
      seasonLowFor
      seasonHighFor
      scoringDifferential
      efficiency
      seasonStdDevPF
      totalCoachRating
    }
  }
`;

export default graphql(query, {
  options: props => ({ variables: { id: props.teamId } })
})(TeamWeeklyTableContainer);
