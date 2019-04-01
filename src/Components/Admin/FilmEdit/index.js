import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  FILMSOPTIONS,
  AWARDSOPTIONS,
  PRODUCERSOPTIONS,
  COMPOSERSOPTIONS,
  FILMSGENRESOPTIONS,
  FILMSCOUNTRIESOPTIONS,
  DESIGNERSOPTIONS,
  SCRIPTWRITERSOPTIONS,
  DIRECTORSOPTIONS,
  ACTORSOPTIONS
} from "../../../constants";
import EditTable from "../../Table";
const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    width: `calc(100vw - 24px)`
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%"
  }
});

// function FullWidthGrid(props) {
class FullWidthGrid extends React.Component {
  state = {
    value: 0,
    filmid: 0
  };

  handleFilmChange = filmid => {
    this.setState({ filmid });
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { filmid } = this.state;
    console.log(filmid);
    return (
      <React.Fragment>
        <div className={classes.root}>
          <Grid
            container
            spacing={32}
            alignItems="stretch"
            direction="row"
            justify="center"
          >
            <Grid
              item
              xs={12}
              alignItems="center"
              direction="row"
              justify="center"
              spacing={32}
            >
              <Paper className={classes.paper}>
                <EditTable
                  table="films"
                  options={FILMSOPTIONS}
                  name="Фильмы"
                  onSelectChange={this.handleFilmChange}
                  mainTable={true}
                />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <EditTable
                  table="filmsactors"
                  options={ACTORSOPTIONS(filmid)}
                  name="Актеры"
                />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <EditTable
                  table="filmsdirectors"
                  options={DIRECTORSOPTIONS(filmid)}
                  name="Режисеры"
                  // selectedItem={filmid}
                />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <EditTable
                  table="filmsscriptwriters"
                  options={SCRIPTWRITERSOPTIONS(filmid)}
                  name="Сценаристы"
                  // selectedItem={filmid}
                />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <EditTable
                  table="filmsdesigners"
                  options={DESIGNERSOPTIONS(filmid)}
                  name="Художники"
                  // selectedItem={filmid}
                />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <EditTable
                  table="awards"
                  options={AWARDSOPTIONS(filmid)}
                  name="Награды"
                  // selectedItem={filmid}
                />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <EditTable
                  table="filmsproducers"
                  options={PRODUCERSOPTIONS(filmid)}
                  name="Продюсеры"
                  // selectedItem={filmid}
                />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <EditTable
                  table="filmscomposers"
                  options={COMPOSERSOPTIONS(filmid)}
                  name="Композиторы"
                  // selectedItem={filmid}
                />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <EditTable
                  table="filmsgenres"
                  options={FILMSGENRESOPTIONS(filmid)}
                  name="Жанры"
                  // selectedItem={filmid}
                />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <EditTable
                  table="filmscountries"
                  options={FILMSCOUNTRIESOPTIONS(filmid)}
                  name="Страны"
                  // selectedItem={filmid}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

FullWidthGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FullWidthGrid)