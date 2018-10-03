import React from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { parse } from "qs";
import LeagueLineChart from "../components/LeagueLineChart";

const LeagueLineChartContainer = ({
  teamId,
  history,
  location,
  data: { loading, leagueStats }
}) => {
  if (loading) {
    return <div>loading...</div>;
  }
  const params = parse(location.search, { ignoreQueryPrefix: true });
  return (
    <LeagueLineChart
      onStatChange={stat =>
        history.push({ pathname: location.pathname, search: `?stat=${stat}` })
      }
      selectedStat={params.stat}
      teamId={teamId}
      leagueStats={leagueStats}
    />
  );
};

const query = gql`
  query LeagueStatsQuery {
    leagueStats {
      id
      teamName
      teamId
      teamAbbrev
      logoUrl
      teamStats {
        id
        scoringPeriodId
        teamId
        pointsFor
        pointsAgainst
        benchPointsFor
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
  }
`;

export default graphql(query)(LeagueLineChartContainer);
