import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { URL } from "../../constants";
import { setPasswordField, setLoginField } from "./actions";
import { ON_CORRECT_RESPONSE, ON_WRONG_RESPONSE } from "./constants.js";
// import CircularProgress from "@material-ui/core/CircularProgress";
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "center",
    width: 400,
    height: 300
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  margin: {
    margin: theme.spacing.unit,
    width: "100%"
  }
});

const mapStateToProps = state => {
  return {
    passwordField: state.authReducer.passwordField,
    loginField: state.authReducer.loginField,
    error: state.authReducer.error,
    pending: state.appReducer.authPending
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUpdatePasswordField: event =>
      dispatch(setPasswordField(event.target.value)),
    onUpdateLoginField: event => dispatch(setLoginField(event.target.value)),
    onCorrectResponse: () =>
      dispatch({ type: ON_CORRECT_RESPONSE, payload: true }),
    onWrongResponse: err => dispatch({ type: ON_WRONG_RESPONSE, payload: err })
  };
};

class Auth extends React.Component {
  saveAuthTokenInSessions = token => {
    window.localStorage.setItem("token", token);
  };
  onSubmitSignIn = () => {
    fetch(`${URL}/api/auth/signin`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.props.loginField,
        password: this.props.passwordField
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data && data.success === true) {
          this.saveAuthTokenInSessions(data.token);
          this.props.onCorrectResponse();
        } else {
          this.props.onWrongResponse("Введены неправильные данные");
        }
      });
  };
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root} elevation={1}>
        <form>
          <Typography variant="h5" component="h3">
            Авторизация
          </Typography>
          <TextField
            id="email"
            label="Email"
            className={classes.textField}
            margin="normal"
            type="email"
            defaultValue={this.props.loginField}
            onChange={this.props.onUpdateLoginField}
          />
          <TextField
            id="password"
            label="Пароль"
            className={classes.textField}
            margin="normal"
            type="password"
            defaultValue={this.props.passwordField}
            onChange={this.props.onUpdatePasswordField}
          />
          <Button
            variant="contained"
            color="primary"
            aria-label="SignIn"
            className={classes.margin}
            onClick={this.onSubmitSignIn}
          >
            Войти
          </Button>
        </form>
      </Paper>
    );
  }
}

Auth.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Auth));
