import React from "react";
import GoogleMapReact from "google-map-react";
import { useMediaQuery, Typography, Paper } from "@material-ui/core";
import { LocationOnOutlined } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import useStyles from "./styles";
import mapStyles from "./mapStyles";
const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
  weatherData,
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width: 600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.MAP_API_KEY }}
        center={coordinates}
        defaultCenter={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places &&
          places.map((place, i) => (
            <div
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={i}
            >
              {!isDesktop ? (
                <LocationOnOutlined color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    className={classes.Typography}
                  >
                    {" "}
                    {place.name}{" "}
                  </Typography>
                  <img
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://images.pexels.com/photos/3490367/pexels-photo-3490367.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                    }
                    alt={place.name}
                  />
                  <Rating size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
            </div>
          ))}
        {weatherData &&
          weatherData.list &&
          weatherData.list.map((data, i) => (
            <div lat={data.coordinates.lat} lng={data.coordinates.lon} key={i}>
              <img
                height="70px"
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt="ok"
              />
            </div>
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
