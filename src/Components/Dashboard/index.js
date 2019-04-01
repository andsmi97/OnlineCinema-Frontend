import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import { URL } from "../../constants";
import { Bar, Line } from "react-chartjs-2";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { URL } from "../../constants"

const styles = theme => ({
  container: {
    width: "100%",
    margin: 0
  },
  card: {
    width: "100%",
    height: "100%",
    padding: 20
  },
  cardValue: {
    textAlign: "center",
    color: theme.palette.primary.main
  }
});
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardData: {}
    };
  }
  componentDidMount() {
    (async () => {
      try {
        let data = await fetch(`${URL}/dashboard/data/`);
        let dashboardData = await data.json();
        this.setState({ dashboardData });
      } catch (e) {
        console.log(e);
      }
    })();
  }

  render() {
    const { classes } = this.props;
    const { dashboardData } = this.state;
    return (
      <React.Fragment>
        <Grid
          container
          spacing={32}
          alignItems="stretch"
          direction="row"
          className={classes.container}
          justify="flex-start"
        >
          <Grid item md={6}>
            <Paper className={classes.card}>
              <Bar
                data={{
                  labels: dashboardData.studiosLabels,
                  datasets: [
                    {
                      backgroundColor: [
                        "#421d5c",
                        "#6e1f64",
                        "#972165",
                        "#bc2b5f",
                        "#db4153",
                        "#f15e41",
                        "#fe812b"
                      ],
                      data: dashboardData.studiosData
                    }
                  ]
                }}
                options={{
                  legend: {
                    display: false
                  },
                  title: {
                    display: true,
                    text: "Распределение доходов"
                  }
                }}
              />
            </Paper>
          </Grid>
          <Grid item md={6}>
            <Paper className={classes.card}>
              <Line
                data={{
                  labels: dashboardData.incomeLabels,
                  datasets: [
                    {
                      label: "My First dataset",
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: "rgba(75,192,192,1)",
                      borderCapStyle: "butt",
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: "miter",
                      pointBorderColor: "rgba(75,192,192,1)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(75,192,192,1)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: dashboardData.incomeData
                    }
                  ]
                }}
                options={{
                  legend: {
                    display: false
                  },
                  title: {
                    display: true,
                    text: "Прибыль"
                  }
                }}
              />
            </Paper>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={32}
          alignItems="stretch"
          direction="row"
          className={classes.container}
          justify="flex-start"
        >
          <Grid item md={2}>
            <Paper className={classes.card}>
              <Typography variant="subtitle2">Прибыль</Typography>
              <Typography variant="h2" className={classes.cardValue}>
                {dashboardData.income}
              </Typography>
            </Paper>
          </Grid>
          <Grid item md={2}>
            <Paper className={classes.card}>
              <Typography variant="subtitle2">
                Количество пользователей
              </Typography>
              <Typography variant="h2" className={classes.cardValue}>
                {dashboardData.userscount}
              </Typography>
            </Paper>
          </Grid>
          <Grid item md={2}>
            <Paper className={classes.card}>
              <Typography variant="subtitle2">Количество фильмов</Typography>
              <Typography variant="h2" className={classes.cardValue}>
                {dashboardData.filmscount}
              </Typography>
            </Paper>
          </Grid>
          <Grid item md={2}>
            <Paper className={classes.card}>
              <Typography variant="subtitle2">
                Количество правообладателей
              </Typography>
              <Typography variant="h2" className={classes.cardValue}>
                {dashboardData.copyrightownerscount}
              </Typography>
            </Paper>
          </Grid>
          <Grid item md={2}>
            <Paper className={classes.card}>
              <Typography variant="subtitle2">Премиум пользователей</Typography>
              <Typography variant="h2" className={classes.cardValue}>
                {dashboardData.premiumuserscount}
              </Typography>
            </Paper>
          </Grid>
          <Grid item md={2}>
            <Paper className={classes.card}>
              <Typography variant="subtitle2">
                Самый просматриваемый фильм
              </Typography>
              <Typography variant="h4" className={classes.cardValue}>
                {dashboardData.topfilm}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Dashboard);
