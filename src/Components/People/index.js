import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import PersonCard from "./PersonCard";
import { URL } from "../../constants";
import { styles } from "./styles";

class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peopleCards: []
    };
  }
  componentDidMount() {
    (async () => {
      try {
        let data = await fetch(`${URL}/db/people`, {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            fields: [
              "personname as name",
              "personid as id",
              "personbirthday as birthday",
              "personavatar as avatar"
            ]
          })
        });
        let peopleCards = await data.json();
        this.setState({ peopleCards });
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
          let data = await fetch(`${URL}/db/people`, {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              fields: [
                "personname as name",
                "personid as id",
                "personbirthday as birthday",
                "personavatar as avatar"
              ]
            })
          });
          let peopleCards = await data.json();
          this.setState({ peopleCards });
        } catch (e) {
          //TODO change connection error
          console.log(e);
        }
      })();
      this.forceUpdate();
    }
  }
  render() {
    const { peopleCards } = this.state;
    return (
        <Grid
          container
          spacing={32}
          alignItems="stretch"
          direction="row"
          justify="flex-start"
        >
          {peopleCards.map(card => (
            <Grid
              item
              md={3}
              alignItems="center"
              direction="row"
              justify="center"
              spacing={32}
              key={card.id}
            >
              <PersonCard
                id={card.id}
                avatar={card.avatar}
                name={card.name}
              />
            </Grid>
          ))}
        </Grid>
    );
  }
}

People.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(People);
