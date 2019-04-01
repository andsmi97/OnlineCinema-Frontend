import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FilmCard from "./FilmCard";
import { URL } from "../../constants";
import { styles } from "./styles";
import { connect } from "react-redux";
import { changeFilter } from "./actions";
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

class FullWidthGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filmsCards: []
    };
  }
  componentDidMount() {
    (async () => {
      try {
        let data = await fetch(`${URL}/films/cards/0`, {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            filter: this.props.filter
          })
        });
        let filmsCards = await data.json();
        this.setState({ filmsCards });
      } catch (e) {
        //TODO change connection error
        console.log(e);
      }
    })();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.filter !== this.props.filter) {
      (async () => {
        try {
          let data = await fetch(`${URL}/films/cards/0`, {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              filter: this.props.filter
            })
          });
          let filmsCards = await data.json();
          this.setState({ filmsCards });
        } catch (e) {
          //TODO change connection error
          console.log(e);
        }
      })();
      this.forceUpdate();
    }
  }
  render() {
    const { classes } = this.props;
    const { filmsCards } = this.state;
    return (
      <div className={classes.root}>
        {console.log("data", filmsCards)}
        <Grid
          container
          spacing={32}
          alignItems="stretch"
          direction="row"
          justify="flex-start"
        >
          {filmsCards.map(card => (
            <Grid
              item
              xs={3}
              alignItems="center"
              direction="row"
              justify="center"
              spacing={32}
              key={card.filmscards.id}
            >
              <FilmCard
                id={card.filmscards.id}
                avatar={card.filmscards.poster}
                filmname={card.filmscards.name}
                filmrating={card.filmscards.rating}
                filmdescription={card.filmscards.description}
                genres={card.filmscards.genres}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

FullWidthGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(FullWidthGrid));
