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

export default graphql(query, {
  options: props => ({ variables: { id: props.teamId } })
})(TeamWeeklyTableContainer);
