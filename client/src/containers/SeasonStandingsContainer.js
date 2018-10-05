import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { parse } from "qs";
import SeasonStandingsChart from "../components/SeasonStandingsChart";

const SeasonStandingsContainer = ({
  teamId,
  history,
  location,
  data: { loading, leagueStats }
}) => {
  if (loading || !leagueStats) {
    return <div>loading...</div>;
  }
  const params = parse(location.search, { ignoreQueryPrefix: true });
  return (
    <SeasonStandingsChart
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
        last3AvgFor
        last3AvgOptimal
        seasonAvgFor
        seasonHighFor
        seasonLowFor
        seasonAvgOptimal
        seasonHighOptimal
        seasonLowOptimal
        totalFor
        totalAgainst
        totalBench
        totalOptimal
        totalDifferential
        seasonStdDevPF
        totalEfficiency
        totalCoachRating
      }
    }
  }
`;

export default graphql(query)(SeasonStandingsContainer);
