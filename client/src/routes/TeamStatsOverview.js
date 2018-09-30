import React from "react";
import TeamStatsOverviewContainer from "../containers/TeamStatsOverviewContainer";

const TeamStatsOverview = props => {
  const {
    match: {
      params: { teamId }
    }
  } = props;
  return <TeamStatsOverviewContainer teamId={teamId} />;
};

export default TeamStatsOverview;
