import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ShipsTable = (props) => {
  return (
    <Grid container className="shipslist-grid-container" spacing={5}>
      {props.shipsData.map((item) => (
        <Grid item key={item.id} xs={12} md={6} lg={4}>
          <Card sx={{ height: 750, width: 500, margin: "0px 25px 25px 60px" }}>
            <CardMedia
              component="img"
              height="500"
              image={item.image}
              alt="Ship Image"
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
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign={"left"}
              >
                Port: {item.home_port}
                <br/>
                Built: {(item.year_built ? item.year_built : "Not available")} 
                <br/>
                Weight: {item.mass_lbs ? `${item.mass_lbs} lbs` : "Not available"}
              </Typography>
              {item.launches.map((launch) => (
                <Typography
                  key={launch.id}
                  variant="body2"
                  color="text.secondary"
                  textAlign={"left"}
                >
                  Launch Name: {launch.name}
                </Typography>
              ))}
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign={"left"}
              >
              <Link to={item.link}>Learn More</Link>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ShipsTable;

