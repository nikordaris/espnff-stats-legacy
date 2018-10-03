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

const TeamWeeklyTable = ({ teamStats, classes }) => {
  return (
    <Card className={classes.card}>
      <CardHeader className={classes.cardHeader}>{`${
        teamStats[0].teamName
      } Overview`}</CardHeader>
      <CardBody tag={Table} className={classes.table} dark>
        <thead>
          <tr>
            <th>#</th>
            <th>PF</th>
            <th>PA</th>
            <th>&sigma; PF</th>
            <th>Optimal</th>
            <th>Bench</th>
            <th>Avg PF</th>
            <th>Low PF</th>
            <th>High PF</th>
            <th>Efficiency</th>
            <th>Coaching</th>
          </tr>
        </thead>
        <tbody>
          {teamStats.reverse().map(stats => (
            <tr key={stats.id}>
              <th scope="row">{stats.scoringPeriodId}</th>
              <td>{stats.pointsFor}</td>
              <td>{stats.pointsAgainst}</td>
              <td>{stats.seasonStdDevPF}</td>
              <td>{stats.optimalPoints}</td>
              <td>{stats.benchPointsFor}</td>
              <td>{stats.seasonAvgFor}</td>
              <td>{stats.seasonLowFor}</td>
              <td>{stats.seasonHighFor}</td>
              <td>{stats.efficiency * 100}%</td>
              <td>{stats.totalCoachRating}</td>
            </tr>
          ))}
        </tbody>
      </CardBody>
    </Card>
  );
};

export default injectSheet(styles)(TeamWeeklyTable);
