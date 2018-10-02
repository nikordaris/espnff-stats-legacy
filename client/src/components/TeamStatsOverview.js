import React from "react";
import { Card, CardHeader, CardBody, Table } from "reactstrap";
import injectSheet from "react-jss";

const styles = theme => ({
  card: {
    color: theme.colors.secondary
  }
});

const TeamStatsOverview = ({ teamStats, classes }) => {
  return (
    <Card className={classes.card}>
      <CardHeader>{`${teamStats[0].teamName} Overview`}</CardHeader>
      <CardBody tag={Table}>
        <thead>
          <tr>
            <th>#</th>
            <th>PF</th>
            <th>Bench</th>
            <th>Optimal</th>
            <th>PA</th>
            <th>Efficiency</th>
            <th>SD PF</th>
            <th>Coaching</th>
          </tr>
        </thead>
        <tbody>
          {teamStats.reverse().map(stats => (
            <tr key={stats.id}>
              <th scope="row">{stats.scoringPeriodId}</th>
              <td>{stats.pointsFor}</td>
              <td>{stats.benchPointsFor}</td>
              <td>{stats.optimalPoints}</td>
              <td>{stats.pointsAgainst}</td>
              <td>{stats.efficiency}</td>
              <td>{stats.seasonStdDevPF}</td>
              <td>{stats.totalCoachRating}</td>
            </tr>
          ))}
        </tbody>
      </CardBody>
    </Card>
  );
};

export default injectSheet(styles)(TeamStatsOverview);
