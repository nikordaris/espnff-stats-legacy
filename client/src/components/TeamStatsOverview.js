import React from "react";
import { Card, CardHeader, CardBody, Table } from "reactstrap";
import injectSheet from "react-jss";

const styles = theme => ({
  card: {
    color: theme.colors.white,
    backgroundColor: theme.colors.gray1000
  },
  cardHeader: {
    backgroundColor: theme.colors.gray1000,
    color: theme.colors.white
  },
  table: {
    marginBottom: 0
    // backgroundColor: theme.colors.gray100,
    // color: theme.colors.white,
    // borderColor: theme.colors.secondary
  },
  sdPF: {
    color: theme.colors.tertiary
  }
});

const TeamStatsOverview = ({ teamStats, classes }) => {
  return (
    <Card className={classes.card}>
      <CardHeader className={classes.cardHeader}>{`${
        teamStats[0].teamName
      } Overview`}</CardHeader>
      <CardBody tag={Table} className={classes.table} dark>
        <thead>
          <tr>
            <th>#</th>
            <th>
              PF <span className={classes.sdPF}>(&sigma;)</span>
            </th>
            <th>Bench</th>
            <th>Optimal</th>
            <th>PA</th>
            <th>Efficiency</th>
            <th>Coaching</th>
          </tr>
        </thead>
        <tbody>
          {teamStats.reverse().map(stats => (
            <tr key={stats.id}>
              <th scope="row">{stats.scoringPeriodId}</th>
              <td>
                {stats.pointsFor}{" "}
                <span className={classes.sdPF}>({stats.seasonStdDevPF})</span>
              </td>
              <td>{stats.benchPointsFor}</td>
              <td>{stats.optimalPoints}</td>
              <td>{stats.pointsAgainst}</td>
              <td>{stats.efficiency * 100}%</td>
              <td>{stats.totalCoachRating}</td>
            </tr>
          ))}
        </tbody>
      </CardBody>
    </Card>
  );
};

export default injectSheet(styles)(TeamStatsOverview);
