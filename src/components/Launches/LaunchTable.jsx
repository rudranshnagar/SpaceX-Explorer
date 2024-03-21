import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

const LaunchTable = (props) => {
  return (
    <Grid container className="launchlist-grid-container" spacing={5}>
      {props.launchData.map((item) => (
        <Grid item key={item.id} xs={12} md={6} lg={4}>
          <Card sx={{ height: 750, width: 500, margin: "0px 25px 25px 25px" }}>
            <CardMedia
              component="img"
              height="500"
              image={item.links.patch.large}
              alt="Launch Image"
              sx={{
                backgroundColor: "grey",
                paddingTop: "1rem",
                paddingBottom: "1rem",
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
                Flight Number: {item.flight_number}
              </Typography>
              {item.payloads.map((payload) => (
                <Typography
                  key={payload.id}
                  variant="body2"
                  color="text.secondary"
                  textAlign={"left"}
                >
                  Payload Name: {payload.name}
                </Typography>
              ))}
              <Typography
                variant="body2"
                color="text.secondary"
                textAlign={"left"}
              >
                Rocket Name: {item.rocket.name}
                Launchpad Name: {item.launchpad.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LaunchTable;

