import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

const LaunchpadsTable = (props) => {
  return (
    <Grid container className="launchpadslist-grid-container" spacing={5}>
      {props.launchpadData.map((item) => (
        <Grid item key={item.id} xs={12} md={6} lg={4}>
          <Card sx={{ height: 750, width: 500, margin: "0px 25px 25px 25px" }}>
            <CardMedia
              component="img"
              height="500"
              image={item.images.large[0]}
              alt="Launchpad Image"
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
                Full Name: {item.full_name}
                <br />
                Flight Number: {item.flight_number}
                <br />
                Status: {item.status}
                <br />
                Details: {item.details}
              </Typography>
              {item.rockets.map((rocket) => (
                <Typography
                  key={rocket.id}
                  variant="body2"
                  color="text.secondary"
                  textAlign="left"
                >
                  Rocket Name: {rocket.name}
                </Typography>
              ))}

              {item.launches.map((launch, index) => (
                <Typography
                  key={launch.id}
                  variant="body2"
                  color="text.secondary"
                  textAlign="left"
                >
                  {index + 1}. Launch Name: {launch.name}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LaunchpadsTable;
