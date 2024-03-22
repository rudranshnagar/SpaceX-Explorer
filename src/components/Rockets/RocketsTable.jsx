import { Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DataCard from "../Common/DataCard";

const RocketsTable = (props) => {
  return (
    <Grid container className="rocketslist-grid-container" spacing={5}>
      {props.rocketsData.map((item) => (
        <Grid item key={item.id} xs={12} md={6} lg={5}>

        <DataCard imageLink={item.flickr_images[0]} buttonLink={"rockets"} id={item.id}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign={"left"}
              >
                Name: {item.name}
              </Typography>
               <Typography
                variant="body2"
                textAlign={"left"}
              >
                First Flight: {item.first_flight}
                <br />
                Country: {item.country}
                <br />
                Details: {item.description}
                <br />
                <Link to={item.wikipedia}>Wikipedia</Link>
              </Typography>
             </DataCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default RocketsTable;
