import React from "react";
import TeamStatsContainer from "../containers/TeamStatsContainer";

const TeamStatsRoute = props => {
  const {
    match: {
      params: { teamId, view = "overview" }
    }
  } = props;
  return <TeamStatsContainer teamId={teamId} view={view} />;
};

export default TeamStatsRoute;
