import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MovieIcon from "@material-ui/icons/Movie";
import DashboardIcon from "@material-ui/icons/Dashboard";
import FilterIcon from "@material-ui/icons/FilterList";
import SettingsIcon from "@material-ui/icons/Settings";
import EditIcon from "@material-ui/icons/Edit";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import Auth from "../Auth";
import Film from "../Film";
import Films from "../Films";
import FilmEdit from "../Admin/FilmEdit";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import GenresEdit from "../Admin/GenresEdit";
import CitiesEdit from "../Admin/CitiesEdit";
import PeopleEdit from "../Admin/PeopleEdit";
import UsersEdit from "../Admin/UsersEdit";
import CountriesEdit from "../Admin/CountriesEdit";
import SettlementsEdit from "../Admin/SettlementsEdit";
import Person from "../Person";
import People from "../People";
import { URL } from "../../constants";
import { Route, Link, BrowserRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { changeFilter } from "../Films/actions";
import Dashboard from "../Dashboard";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    width: "100%"
  },
  authContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    paddingRight: 24,
    boxShadow: "none"
  },
  grow: {
    flexGrow: 1
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  menuButton2: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    // width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  drawerHeaderRight: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing.unit * 3,
  //   transition: theme.transitions.create("margin", {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen
  //   }),
  //   marginLeft: -drawerWidth,
  //   height: "100vh",
  //   paddingTop: 86
  // },
  content: {
    flexGrow: 1,
    // padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    // marginLeft: -drawerWidth,
    height: "100vh",
    paddingTop: 64
  },
  innerContent: {
    padding: theme.spacing.unit * 3,
    width: `calc(100vw - 24px)`
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 200,
      "&:focus": {
        width: 280
      }
    }
  }
});
const mapStateToProps = state => {
  return {
    filter: state.filmsReducer.filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeFilter: filter => dispatch(changeFilter(filter))
  };
};
class PersistentDrawerLeft extends React.Component {
  state = {
    open: false,
    value: 0,
    catalogValue: 0,
    loggedIn: true,
    openRight: false,
    genres: []
  };

  componentDidMount() {
    (async () => {
      try {
        let data = await fetch(`${URL}/db/genres`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: ["genreid", "genrename"]
          })
        });
        let genres = await data.json();
        console.log(genres);
        this.setState({ genres });
      } catch (e) {
        console.log(e);
      }
    })();
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleDrawerOpenRight = () => {
    this.setState({ openRight: true });
  };

  handleDrawerCloseRight = () => {
    this.setState({ openRight: false });
  };

  handleEditChange = (event, value) => {
    this.setState({ value });
  };
  handleCatalogChange = (event, value) => {
    this.setState({ catalogValue: value });
  };

  render() {
    const { classes, theme } = this.props;
    const { open, value, catalogValue, openRight } = this.state;

    return (
      <BrowserRouter>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                OnlineCinema
              </Typography>
              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Поиск фильмов..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                />
              </div>
              <IconButton
                color="inherit"
                aria-label="Open filter"
                onClick={this.handleDrawerOpenRight}
                className={classNames(
                  classes.menuButton,
                  openRight && classes.hide
                )}
              >
                <FilterIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={openRight}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeaderRight}>
              <IconButton onClick={this.handleDrawerCloseRight}>
                <ChevronRightIcon />
              </IconButton>
            </div>
            {this.state.genres.map(genre => (
              <ListItem
                button
                onClick={() =>
                  this.props.onChangeFilter({ genre: genre.genrename })
                }
                component={Link}
                to={"/catalog/"}
                key={genre.genreid}
              >
                <ListItemText primary={genre.genrename} />
              </ListItem>
            ))}
            <ListItem
              button
              onClick={() => this.props.onChangeFilter({})}
              component={Link}
              to={"/catalog/"}
            >
              <ListItemText primary={"Сбросить"} />
            </ListItem>
          </Drawer>

          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              <ListItem
                button
                key="Dashboard"
                component={Link}
                to="/dashboard/"
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={"Рабочий стол"} />
              </ListItem>
              <ListItem button key="Film" component={Link} to="/catalog/">
                <ListItemIcon>
                  <MovieIcon />
                </ListItemIcon>
                <ListItemText primary={"Каталог"} />
              </ListItem>
              <ListItem button key="Edit" component={Link} to="/edit/ ">
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary={"Редактирование"} />
              </ListItem>
              <ListItem button key="Settings">
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={"Настройки"} />
              </ListItem>
            </List>
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open
            })}
          >
            <Route
              path="/edit/"
              render={() => (
                <React.Fragment>
                  <AppBar position="static">
                    <Tabs value={value} onChange={this.handleEditChange}>
                      <Tab label="Фильмы" />
                      <Tab label="Люди" />
                      <Tab label="Пользователи" />
                      <Tab label="Страны" />
                      <Tab label="Жанры" />
                      <Tab label="Города" />
                      <Tab label="Взаиморасчеты" />
                    </Tabs>
                  </AppBar>

                  {value === 0 && <FilmEdit />}
                  {value === 1 && <PeopleEdit />}
                  {value === 2 && <UsersEdit />}
                  {value === 3 && <CountriesEdit />}
                  {value === 4 && <GenresEdit />}
                  {value === 5 && <CitiesEdit />}
                  {value === 6 && <SettlementsEdit />}
                </React.Fragment>
              )}
            />
            <Route
              path="/catalog/"
              exact
              render={() => (
                <React.Fragment>
                  <AppBar position="static">
                    <Tabs
                      value={catalogValue}
                      onChange={this.handleCatalogChange}
                    >
                      <Tab label="Фильмы" />
                      <Tab label="Люди" />
                    </Tabs>
                  </AppBar>
                  {catalogValue === 0 && <Films />}
                  {/* TODO CHANGE TO PEOPLE */}
                  {catalogValue === 1 && <People />}
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/"
              render={() =>
                this.state.loggedIn ? <Redirect to="/catalog" /> : <Auth />
              }
            />
            <Route
              path={`/catalog/film/:id`}
              component={e => <Film filmid={e.match.params.id} />}
            />
            <Route
              path={`/catalog/person/:id`}
              component={e => <Person personid={e.match.params.id} />}
            />
            <Route path={`/dashboard/`} component={e => <Dashboard />} />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(PersistentDrawerLeft));
