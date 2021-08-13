import React from "react";
import {
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const PlaceDetails = ({ place }) => {
  const classes = useStyles();

  // if (selected)
  //   refProp &&
  //     refProp.current &&
  //     refProp.current.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div>
      <Card elevation={6}>
        <CardMedia
          style={{ height: 350 }}
          image={
            place.photo
              ? place.photo.images.large.url
              : "https://images.pexels.com/photos/3490367/pexels-photo-3490367.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          }
          title={place.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            {place.name}
          </Typography>

          <Box display="flex" justifyContent="space-between">
            <Rating value={Number(place.rating)} readOnly />
            <Typography gutterBottom variant="subtitle1">
              out of {place.num_reviews} Reviews
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">price</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.price_level}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Ranking</Typography>
            <Typography gutterBottom variant="subtitle1">
              {place.ranking}
            </Typography>
          </Box>

          {place &&
            place.awards &&
            place.awards.map((award) => (
              <Box
                my={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <img src={award.images.small} alt="award.display_name" />
                <Typography variant="subtitle2" color="textSecondary">
                  {" "}
                  {award.display_name}{" "}
                </Typography>
              </Box>
            ))}

          {place &&
            place.cuisine &&
            place.cuisine.map(({ name }) => (
              <Chip
                key={name}
                label={name}
                size="small"
                className={classes.chip}
              />
            ))}

          {place && place.address && (
            <Typography
              gutterBottom
              variant="subtitle2"
              color="textSecondary"
              className={classes.subtitle}
            >
              <LocationOnIcon /> {place.address}
            </Typography>
          )}

          {place && place.phone && (
            <Typography
              gutterBottom
              variant="subtitle2"
              color="textSecondary"
              className={classes.spacing}
            >
              <PhoneIcon /> {place.phone}
            </Typography>
          )}

          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(place.web_url, "_blank")}
            >
              TripAdvisor
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => window.open(place.website, "_blank")}
            >
              Website
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceDetails;
