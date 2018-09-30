import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import TeamStatsOverview from "../components/TeamStatsOverview";

const TeamStatsOverviewContainer = ({ data: { loading, teamStats } }) => {
  if (loading) {
    return <span>loading...</span>;
  }
  return <TeamStatsOverview teamStats={teamStats} />;
};

const query = gql`
  query TeamStatsOverview($id: ID!) {
    teamStats(id: $id) {
      id
      scoringPeriodId
      pointsFor
      pointsAgainst
      teamName
      optimalPoints
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
})(TeamStatsOverviewContainer);
