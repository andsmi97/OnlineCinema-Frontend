import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { CITIESOPTIONS } from "../../../constants";
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

class FullWidthGrid extends React.Component {
  render() {
    const { classes } = this.props;
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
                  table="cities"
                  options={CITIESOPTIONS}
                  name="Города"
                  mainTable={true}
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

export default withStyles(styles, { withTheme: true })(FullWidthGrid);
