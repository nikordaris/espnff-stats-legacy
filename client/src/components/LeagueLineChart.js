import React from "react";
import { Card, CardHeader, CardBody, Table } from "reactstrap";
import injectSheet from "react-jss";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip
} from "victory";
import { range } from "lodash";

const styles = theme => ({
  card: {
    color: theme.colors.white
    // backgroundColor: theme.colors.gray500
  },
  cardHeader: {
    backgroundColor: theme.colors.gray1000,
    color: theme.colors.white
  },
  cardBody: {
    marginBottom: 0,
    padding: 0,
    // backgroundColor: theme.colors.gray100,
    color: theme.colors.white
    // borderColor: theme.colors.secondary
  },
  sdPF: {
    color: theme.colors.tertiary
  }
});

const LeagueLineChart = ({ teamId, leagueStats, classes }) => {
  const currentTeam = leagueStats.find(stats => stats.teamId == teamId);

  return (
    <Card className={classes.card}>
      <CardHeader className={classes.cardHeader}>{`${
        currentTeam.teamName
      } Charts`}</CardHeader>
      <CardBody className={classes.cardBody}>
        <VictoryChart theme={VictoryTheme.material}>
          {leagueStats.map(({ id, teamStats, ...rest }) => (
            <VictoryLine
              key={id}
              data={teamStats}
              x="scoringPeriodId"
              y="pointsFor"
              style={{
                data: { stroke: rest.teamId == teamId ? "red" : "black" }
              }}
            />
          ))}
        </VictoryChart>
      </CardBody>
    </Card>
  );
};

export default injectSheet(styles)(LeagueLineChart);
