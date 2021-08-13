import React from "react";
import {
  CircularProgress,
  Typography,
  Grid,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";

import useStyles from "./styles";

import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  rating,
  setType,
  setRating,
}) => {
  const classes = useStyles();
  // const [elRefs, setElRefs] = useState([]);

  // useEffect(() => {
  //   setElRefs((refs) =>
  //     Array(places && places.length)
  //       .fill()
  //       .map((_, i) => refs[i] || createRef())
  //   );
  // }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Hotel, Restaurents and attractions around you.{" "}
      </Typography>

      {isLoading ? (
        <div className={classes.loading}>
          {" "}
          <CircularProgress size="5rem" />{" "}
        </div>
      ) : (
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel>type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurents">Restaurents</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Ratings</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places &&
              places.map((place, i) => (
                <Grid item key={i} xs={12}>
                  <PlaceDetails
                    // selected={Number(childClicked) === i}
                    // refProp={elRefs[i]}
                    place={place}
                  />
                </Grid>
              ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default List;
