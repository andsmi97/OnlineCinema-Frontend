import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const styles = theme => ({
  card: {
    maxWidth: "100%"
  },
  star: {
    color: theme.palette.primary.main
  },
  sectionRating: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing.unit * 2
  },
  media: {
    objectFit: "cover"
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  chip: {
    marginRight: theme.spacing.unit
  },
  sectionGenres: {
    marginTop: theme.spacing.unit * 2
    // marginBottom: theme.spacing.unit * 2,
  },
  elipsis: {
    overflow: "hidden",
    position: "relative",
    lineHeight: "1.2em",
    maxHeight: "3.6em",
    textAlign: "justify",
    marginRight: "-1em",
    paddingRight: "1em",
    "&:before": {
      /* points in the end */
      content: "...",
      /* absolute position */
      position: "absolute",
      /* set position to right bottom corner of block */
      right: 0,
      bottom: 0
    },
    "&:after": {
      /* points in the end */
      content: "",
      /* absolute position */
      position: "absolute",
      /* set position to right bottom corner of text */
      right: 0,
      /* set width and height */
      width: "1em",
      height: "1em",
      marginTop: "0.2em",
      /* bg color = bg color under block */
      background: "white"
    }
  }
});

class PersonCard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            className={classes.media}
            height="600"
            image={this.props.avatar}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.name}
            </Typography>
            {/* {<div>{calculateAge(this.props.birthday)}</div>} */}
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <Button
            component={Link}
            size="small"
            color="primary"
            to={`/catalog/person/${this.props.id}`}
          >
            Подробнее
          </Button>
        </CardActions>
      </Card>
    );
  }
}

PersonCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PersonCard);
