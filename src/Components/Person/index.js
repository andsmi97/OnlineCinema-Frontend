import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { URL } from "../../constants";
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
  },
  paperLeft: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "400"
  },
  nameLink: {
    color: "black"
  },
  leftButton: {
    borderRadius: 40
  },
  actionPaper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 150,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-AROUND"
  },
  descriptionPaper: {
    padding: theme.spacing.unit * 2,
    // textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%"
  },
  header: {
    textAlign: "center"
  },
  descriptionTitle: {
    color: theme.palette.primary.main,
    width: 200,
    display: "inline-block",
    marginTop: 5,
    marginBottom: 5
  },
  divider: {
    background: theme.palette.primary.main
  }
});

class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personData: {}
    };
  }

  componentDidMount() {
    const { personid } = this.props;
    (async () => {
      try {
        let data = await fetch(`${URL}/people/${personid}`);
        let personData = await data.json();
        this.setState({ personData });
      } catch (e) {
        console.log(e);
      }
    })();
  }
  getYear = date => (date ? date.split("-")[0] : null);
  render() {
    const { classes } = this.props;
    const { personData } = this.state;
    // const {
    //   personname,
    //   personbirthday,
    //   personavatar,
    //   personfacts
    // } = personData.person;
    const {
      filmsactors,
      filmsdirectors,
      filmsscriptwriters,
      filmsproducers,
      filmscomposer,
      filmsdesigners,
      personbirthplace,
      genres,
      person,
      filmsamount
    } = personData;
    // const filmsAmount = [
    //   filmsactors,
    //   filmsdirectors,
    //   filmsscriptwriters,
    //   filmsproducers,
    //   filmscomposer,
    //   filmsdesigners
    // ].reduce((acc, role) => {
    //   return (acc += role.length);
    // }, 0);

    return (
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
            xs={2}
            // alignItems="center"
            // direction="row"
            // justify="center"
            // spacing={32}
          >
            <Paper className={classes.paperLeft}>
              {person && (
                <img
                  src={person.personavatar}
                  alt={person.personname}
                  style={{ width: "100%" }}
                />
              )}
            </Paper>
            <Paper className={classes.actionPaper} style={{ marginTop: 32 }}>
              {person && person.personname}
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                fullWidth
              >
                Оценить
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper className={classes.descriptionPaper}>
              <div>
                <span className={classes.descriptionTitle}>Карьера</span>
                <span className={classes.descriptionInfo}>
                  {/* {TODO: create component} */}
                  {filmsactors && Object.entries(filmsactors).length !== 0 && (
                    <React.Fragment>
                      <a href="#actor" className={classes.nameLink}>
                        Актер
                      </a>
                      ,
                    </React.Fragment>
                  )}
                  {filmsdirectors &&
                    Object.entries(filmsdirectors).length !== 0 && (
                      <React.Fragment>
                        <a href="#director" className={classes.nameLink}>
                          Режисер
                        </a>
                        ,
                      </React.Fragment>
                    )}
                  {filmsscriptwriters &&
                    Object.entries(filmsscriptwriters).length !== 0 && (
                      <React.Fragment>
                        <a href="#scriptwriter" className={classes.nameLink}>
                          Сценарист
                        </a>
                        ,
                      </React.Fragment>
                    )}
                  {filmsproducers &&
                    Object.entries(filmsproducers).length !== 0 && (
                      <React.Fragment>
                        <a href="#producer" className={classes.nameLink}>
                          Продюсер
                        </a>
                        ,
                      </React.Fragment>
                    )}
                  {filmscomposer && Object.entries(filmscomposer).length !== 0 && (
                    <React.Fragment>
                      <a href="#composer" className={classes.nameLink}>
                        Композитор
                      </a>
                      ,
                    </React.Fragment>
                  )}
                  {filmsdesigners &&
                    Object.entries(filmsdesigners).length !== 0 && (
                      <React.Fragment>
                        <a href="#designer" className={classes.nameLink}>
                          Художник
                        </a>
                      </React.Fragment>
                    )}
                </span>
                <Divider className={classes.divider} fullWidth />
                {person && person.personbirthday && (
                  <React.Fragment>
                    <span className={classes.descriptionTitle}>
                      Год рождения
                    </span>
                    <span className={classes.descriptionInfo}>
                      {this.getYear(person.personbirthday)}
                    </span>
                    <Divider className={classes.divider} fullWidth />
                  </React.Fragment>
                )}
                {personbirthplace && (
                  <React.Fragment>
                    <span className={classes.descriptionTitle}>
                      Место рождения
                    </span>
                    <span className={classes.descriptionInfo}>
                      {personbirthplace.cityname},{personbirthplace.countryname}
                    </span>
                    <Divider className={classes.divider} fullWidth />
                  </React.Fragment>
                )}
                {genres && (
                  <React.Fragment>
                    <span className={classes.descriptionTitle}>Жанры</span>
                    <span className={classes.descriptionInfo}>
                      {genres.map(genre => (
                        <React.Fragment key={genre.genreid}>{genre.genrename},</React.Fragment>
                      ))}
                    </span>
                    <Divider className={classes.divider} fullWidth />
                  </React.Fragment>
                )}
                <span className={classes.descriptionTitle}>Всего фильмов</span>
                <span className={classes.descriptionInfo}>{filmsamount}</span>
                <Divider className={classes.divider} fullWidth />
                {person && person.personfacts && (
                  <React.Fragment>
                    <span className={classes.descriptionTitle}>Факты</span>
                    <span className={classes.descriptionInfo}>
                      {person.personfacts}
                    </span>
                    <Divider className={classes.divider} fullWidth />
                  </React.Fragment>
                )}
              </div>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <h4>Награды</h4>
              <img
                src="https://www.newtonplks.org/wp-content/uploads/2016/02/Oscar-statue.jpg"
                alt=""
                style={{ width: "100%" }}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Person.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Person);
