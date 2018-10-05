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
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryAxis
} from "victory";
import { titleCase } from "change-case";

const statOptions = [
  "last3AvgFor",
  "last3AvgOptimal",
  "seasonAvgFor",
  "seasonHighFor",
  "seasonLowFor",
  "seasonAvgOptimal",
  "seasonHighOptimal",
  "seasonLowOptimal",
  "totalFor",
  "totalAgainst",
  "totalBench",
  "totalOptimal",
  "totalDifferential",
  "seasonStdDevPF",
  "totalEfficiency",
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

class SeasonStandingsChart extends React.Component {
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
      selectedStat = "last3AvgFor"
    } = this.props;
    const currentTeam = leagueStats.find(stats => stats.teamId == teamId);
    console.log(currentTeam.teamAbbrev);
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
            padding={{ top: 5, bottom: 30, left: 35, right: 10 }}
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
                tickLabels: { fontSize: 4 }
              }}
            />
            <VictoryAxis
              id="x-axis"
              label="Team"
              orientation="bottom"
              tickValues={leagueStats.map(s => s.teamAbbrev)}
              style={{
                axisLabel: { fontSize: 8, padding: 20 },
                tickLabels: { fontSize: 3 }
              }}
            />
            <VictoryBar
              style={{
                data: {
                  fill: d =>
                    d.teamAbbrev == currentTeam.teamAbbrev
                      ? "#c43a31"
                      : "#000000",
                  stroke: d =>
                    d.teamAbbrev == currentTeam.teamAbbrev
                      ? "#c43a31"
                      : "#000000",
                  fillOpacity: 0.7,
                  strokeWidth: 0.5
                },
                labels: {
                  fontSize: 15,
                  fill: d =>
                    d.teamAbbrev == currentTeam.teamAbbrev
                      ? "#c43a31"
                      : "#000000"
                }
              }}
              data={leagueStats}
              x="teamAbbrev"
              y={s => get(s.teamStats[s.teamStats.length - 1], selectedStat)}
            />
          </VictoryChart>
        </CardBody>
      </Card>
    );
  }
}

export default injectSheet(styles)(SeasonStandingsChart);
