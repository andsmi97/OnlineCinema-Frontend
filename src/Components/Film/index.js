import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import YouTube from "react-youtube";
import { URL } from "../../constants";
import { Link } from "react-router-dom";
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
    // position: "fixed"
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

class Film extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filmData: {}
    };
  }
  componentDidMount() {
    const { filmid } = this.props;
    (async () => {
      try {
        let data = await fetch(`${URL}/films/film/${filmid}`);
        let filmData = await data.json();
        this.setState({ filmData });
      } catch (e) {
        console.log(e);
      }
    })();
  }
  getYoutubeLink = link => link.split("=")[1];
  getYear = date => date.split("-")[0];
  render() {
    const { classes } = this.props;
    const { filmData } = this.state;
    const {
      film,
      filmsactors,
      filmsdirectors,
      filmsscriptwriters,
      filmsproducers,
      filmscomposers,
      filmsdesigners,
      filmsgenres,
      filmscountries,
      awards
    } = filmData;
    return (
      <div className={classes.root}>
        {film && (
          <React.Fragment>
            <Grid
              container
              spacing={32}
              alignItems="stretch"
              direction="row"
              justify="center"
            >
              <Grid item xs={2}>
                <Paper className={classes.paperLeft}>
                  <img
                    src={film.filmposterlink}
                    alt={film.filmname}
                    style={{ width: "100%" }}
                  />
                </Paper>
                <Paper
                  className={classes.actionPaper}
                  style={{ marginTop: 32 }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    fullWidth
                  >
                    Купить
                  </Button>
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
                <Paper className={classes.paper}>
                  <h4>{film.filmname}</h4>
                  <YouTube
                    videoId={this.getYoutubeLink(film.filmlink)}
                    onPlay={() => console.log(this.props.filmid)}
                    opts={{
                      height: "600",
                      width: "100%",
                      playerVars: {
                        autoplay: 0
                      }
                    }}
                  />
                  {console.log(this.getYoutubeLink(film.filmlink))}
                </Paper>
              </Grid>
              <Grid item xs={2}>
                {filmsactors && (
                  <Paper className={classes.paper}>
                    Актеры <br />
                    <br />
                    {filmsactors.map(actor => (
                      <React.Fragment key={actor.personid}>
                        <Link
                          to={`/catalog/person/${actor.personid}`}
                          className={classes.nameLink}
                        >
                          {actor.personname}
                        </Link>
                        <br />
                      </React.Fragment>
                    ))}
                  </Paper>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={32} justify="flex-end">
              <Grid item xs={8}>
                <Paper className={classes.descriptionPaper}>
                  <h4 className={classes.header}>Описание</h4>
                  <div>
                    <span className={classes.descriptionTitle}>Год</span>
                    <span className={classes.descriptionInfo}>
                      {this.getYear(film.filmreleasedate)}
                    </span>
                    <Divider className={classes.divider} />
                    {filmscountries && (
                      <React.Fragment>
                        <span className={classes.descriptionTitle}>Страна</span>
                        <span className={classes.descriptionInfo}>
                          {filmscountries.map(country => (
                            <Link
                              to={`/catalog/films`}
                              className={classes.nameLink}
                              key={country.countryid}
                            >
                              {country.countryname}
                            </Link>
                          ))}
                        </span>
                        <Divider className={classes.divider} />
                      </React.Fragment>
                    )}
                    {filmsdirectors && (
                      <React.Fragment>
                        <span className={classes.descriptionTitle}>
                          Режисер
                        </span>
                        <span className={classes.descriptionInfo}>
                          {filmsdirectors.map(director => (
                            <Link
                              to={`/catalog/person/${director.personid}`}
                              className={classes.nameLink}
                              key={director.personid}
                            >
                              {director.personname}
                            </Link>
                          ))}
                        </span>
                        <Divider className={classes.divider} />
                      </React.Fragment>
                    )}
                    {filmsscriptwriters && (
                      <React.Fragment>
                        <span className={classes.descriptionTitle}>
                          Сценарий
                        </span>
                        <span className={classes.descriptionInfo}>
                          {filmsscriptwriters.map(scriptwriter => (
                            <Link
                              to={`/catalog/person/${scriptwriter.personid}`}
                              className={classes.nameLink}
                              key={scriptwriter.personid}
                            >
                              {scriptwriter.personname}
                            </Link>
                          ))}
                        </span>
                        <Divider className={classes.divider} />
                      </React.Fragment>
                    )}
                    {filmsproducers && (
                      <React.Fragment>
                        <span className={classes.descriptionTitle}>
                          Продюсер
                        </span>
                        <span className={classes.descriptionInfo}>
                          {filmsproducers.map(producer => (
                            <Link
                              to={`/catalog/person/${producer.personid}`}
                              className={classes.nameLink}
                              key={producer.personid}
                            >
                              {producer.personname}
                            </Link>
                          ))}
                        </span>
                        <Divider className={classes.divider} />
                      </React.Fragment>
                    )}
                    {filmscomposers && (
                      <React.Fragment>
                        <span className={classes.descriptionTitle}>
                          Композитор
                        </span>
                        <span className={classes.descriptionInfo}>
                          {filmscomposers.map(composer => (
                            <Link
                              to={`/catalog/person/${composer.personid}`}
                              className={classes.nameLink}
                              key={composer.personid}
                            >
                              {composer.personname}
                            </Link>
                          ))}
                        </span>
                        <Divider className={classes.divider} />
                      </React.Fragment>
                    )}
                    {filmsdesigners && (
                      <React.Fragment>
                        <span className={classes.descriptionTitle}>
                          Художник
                        </span>
                        <span className={classes.descriptionInfo}>
                          {filmsdesigners.map(designer => (
                            <Link
                              to={`/catalog/person/${designer.personid}`}
                              className={classes.nameLink}
                              key={designer.personid}
                            >
                              {designer.personname}
                            </Link>
                          ))}
                        </span>
                        <Divider className={classes.divider} />
                      </React.Fragment>
                    )}
                    {filmsgenres && (
                      <React.Fragment>
                        <span className={classes.descriptionTitle}>Жанры</span>
                        <span className={classes.descriptionInfo}>
                          {/* TODO ADD FILTER */}
                          {filmsgenres.map(genre => (
                            <Link
                              to={`/catalog`}
                              className={classes.nameLink}
                              key={genre.genreid}
                            >
                              {genre.genrename}
                            </Link>
                          ))}
                        </span>
                        <Divider className={classes.divider} />
                      </React.Fragment>
                    )}
                    {film.filmbudget && (
                      <React.Fragment>
                        <span className={classes.descriptionTitle}>Бюджет</span>
                        <span className={classes.descriptionInfo}>
                          {film.filmbudget}
                        </span>
                        <Divider className={classes.divider} />
                      </React.Fragment>
                    )}
                    {film.filmagerestriction && (
                      <React.Fragment>
                        <span className={classes.descriptionTitle}>
                          Возраст
                        </span>
                        <span className={classes.descriptionInfo}>
                          {film.filmagerestriction}
                        </span>
                        <Divider className={classes.divider} />
                      </React.Fragment>
                    )}
                    {film.filmlength && (
                      <React.Fragment>
                        <span className={classes.descriptionTitle}>
                          Длительность
                        </span>
                        <span className={classes.descriptionInfo}>
                          {film.filmlength}
                        </span>
                        <Divider className={classes.divider} />
                      </React.Fragment>
                    )}
                    {film.filmdescription && (
                      <React.Fragment>
                        <span className={classes.descriptionTitle}>
                          Описание
                        </span>
                        <span className={classes.descriptionInfo}>
                          {film.filmdescription}
                        </span>
                        <Divider className={classes.divider} />
                      </React.Fragment>
                    )}
                  </div>
                </Paper>
              </Grid>
              {/* TODO fix awards */}
              <Grid item xs={2}>
                {awards && (
                  <Paper className={classes.paper}>
                    <h4>Награды</h4>
                    <img
                      src="https://www.newtonplks.org/wp-content/uploads/2016/02/Oscar-statue.jpg"
                      alt=""
                      style={{ width: "100%" }}
                    />
                  </Paper>
                )}
              </Grid>
            </Grid>
          </React.Fragment>
        )}
      </div>
    );
  }
}

Film.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Film);
