import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  SETTLEMENTSOPTIONS,
  SETTLEMENTSCOPYRIGHTOPTIONS
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

class Settlements extends React.Component {
  state = {
    settlementId: 0
  };

  handleSettlementChange = settlementId => {
    this.setState({ settlementId });
  };

  render() {
    const { classes } = this.props;
    const { settlementId } = this.state;
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
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <EditTable
                  table="settlements"
                  options={SETTLEMENTSOPTIONS}
                  name="Платежи"
                  onSelectChange={this.handleSettlementChange}
                  mainTable={true}
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <EditTable
                  table="settlementscopyrightowners"
                  options={SETTLEMENTSCOPYRIGHTOPTIONS(settlementId)}
                  name="Расчеты"
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

Settlements.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Settlements);
