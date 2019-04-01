import React, { Component } from "react";
import AppDrawer from "./Components/Drawer";
import Auth from "./Components/Auth";
import { connect } from "react-redux";
import { authenticate } from "./actions";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  root: {
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  }
});
const mapStateToProps = state => {
  return {
    isResponseCorrect: state.authReducer.isResponseCorrect
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuth: () => dispatch(authenticate())
  };
};
class App extends Component {
  componentDidMount() {
    this.props.onAuth();
  }
  render() {
    const { classes } = this.props;
    return this.props.isResponseCorrect ? (
      <AppDrawer />
    ) : (
      <div className={classes.root}>
        <Auth />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
