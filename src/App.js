import React, { useEffect, useState } from "react";
import { Grid, CssBaseline } from "@material-ui/core";
import Map from "./components/Map/Map";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import { getPlacesData, getWeatherData } from "./API";
function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState();
  const [bounds, setBounds] = useState({});
  const [childClicked, setChildClicked] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("hotels");
  const [rating, setRating] = useState(0);
  const [placesFilteredByRating, setPlacesFilteredByRating] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const filteredPlaces =
      places && places.filter((place) => place.rating > rating);
    setPlacesFilteredByRating(filteredPlaces);
  }, [rating]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({
          lat: latitude,
          lng: longitude,
        });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(
          data && data.filter((place) => place.name && place.num_reviews > 0)
        );
        setIsLoading(false);
      });
    }
  }, [bounds, type]);
  return (
    <div>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={
              placesFilteredByRating.length ? placesFilteredByRating : places
            }
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            places={
              placesFilteredByRating.length ? placesFilteredByRating : places
            }
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
