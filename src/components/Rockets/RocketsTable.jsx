import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const RocketsTable = (props) => {
  return (
    <Grid container className="rocketslist-grid-container" spacing={5}>
      {props.rocketsData.map((item) => (
        <Grid item key={item.id} xs={12} md={6} lg={5}>
          <Card sx={{ height: 750, width: 500, margin: "0px 25px 25px 280px" }}>
            <CardMedia
              component="img"
              height="500"
              image={item.flickr_images[0]}
              alt="Rocket Image"
              sx={{
                backgroundColor: "grey",
              }}
            />
            <CardContent sx={{ maxHeight: 200, overflow: "auto" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign={"left"}
              >
                Name: {item.name}
                <br/>
                First Flight: {item.first_flight}
                <br/>
                Country: {item.country}
                <br/>
                Details: {item.description}
                <br/>
                <Link to={item.wikipedia}>Learn More</Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RocketsTable;

