import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Form,
  Label,
  FormGroup,
  Col
} from "reactstrap";
import injectSheet from "react-jss";
import { min, max, get } from "lodash";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryAxis
} from "victory";
import { titleCase } from "change-case";

const statOptions = [
  "pointsFor",
  "pointsAgainst",
  "benchPointsFor",
  "optimalPoints",
  "scoringDifferential",
  "efficiency",
  "seasonStdDevPF",
  "totalCoachRating"
];

const styles = theme => ({
  card: {
    color: theme.colors.white,
    borderColor: theme.colors.gray1000
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
  form: {
    padding: [15, 25, 0, 10],
    "@global label": {
      color: theme.colors.secondary,
      fontWeight: "bold",
      textAlign: "right"
    }
  },
  sdPF: {
    color: theme.colors.tertiary
  }
});

class WeeklyStandingsChart extends React.Component {
  handleSelectStat = e => {
    const { onStatChange } = this.props;
    onStatChange(e.target.value);
    e.preventDefault();
  };

  render() {
    const {
      teamId,
      leagueStats,
      classes,
      selectedStat = "pointsFor"
    } = this.props;
    const currentTeam = leagueStats.find(stats => stats.teamId == teamId);
    const selectedStatLabel = titleCase(selectedStat);
    return (
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader}>{`${
          currentTeam.teamName
        } Charts`}</CardHeader>
        <CardBody className={classes.cardBody}>
          <Form className={classes.form}>
            <FormGroup row>
              <Label for="lineChartSelectedStat" sm={2}>
                Select Stat
              </Label>
              <Col sm={10}>
                <Input
                  id="lineChartSelectedStat"
                  type="select"
                  name="selectedStat"
                  value={selectedStat}
                  onChange={this.handleSelectStat}
                >
                  {statOptions.map(stat => (
                    <option key={stat} value={stat}>
                      {titleCase(stat)}
                    </option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
          </Form>
          <VictoryChart
            theme={VictoryTheme.material}
            height={100}
            width={200}
            padding={{ top: 5, bottom: 30, left: 35, right: 5 }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            style={{
              parent: {
                fontSize: 12
              }
            }}
          >
            <VictoryAxis
              id="y-axis"
              orientation="left"
              dependentAxis
              label={selectedStatLabel}
              fixLabelOverlap
              style={{
                axisLabel: { fontSize: 8, padding: 25 },
                tickLabels: { fontSize: 6 }
              }}
            />
            <VictoryAxis
              id="x-axis"
              label="Week"
              orientation="bottom"
              tickValues={leagueStats[0].teamStats.map(s => s.scoringPeriodId)}
              fixLabelOverlap
              style={{
                axisLabel: { fontSize: 8, padding: 20 },
                tickLabels: { fontSize: 6 }
              }}
            />
            {leagueStats.map(({ id, teamStats, ...rest }) => {
              const lineStyle = {
                data: {
                  stroke: rest.teamId == teamId ? "red" : "black",
                  strokeWidth: rest.teamId == teamId ? 1 : 0.5
                }
              };
              return (
                <VictoryLine
                  key={id}
                  data={teamStats}
                  x="scoringPeriodId"
                  y={selectedStat}
                  style={lineStyle}
                />
              );
            })}
          </VictoryChart>
        </CardBody>
      </Card>
    );
  }
}

export default injectSheet(styles)(WeeklyStandingsChart);
