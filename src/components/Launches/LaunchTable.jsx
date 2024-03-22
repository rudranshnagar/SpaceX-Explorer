import { Grid, Typography } from "@mui/material";
import DataCard from "../Common/DataCard";

const LaunchTable = (props) => {
  return (
    <Grid container className="launchlist-grid-container" spacing={5}>
      {props.launchData.map((item) => (
        <Grid item key={item.id} xs={12} md={6} lg={4}>

          <DataCard imageLink={item.links.patch.large} buttonLink={"launches"} id={item.id}>
          
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
                Flight Number: {item.flight_number}
              </Typography>
              {item.payloads.map((payload) => (
                <Typography
                  key={payload.id}
                  variant="body2"
                
                  textAlign={"left"}
                >
                  Payload Name: {payload.name}
                </Typography>
              ))}
              <Typography
                variant="body2"
                
                textAlign={"left"}
              >
                Rocket Name: {item.rocket.name}
                <br />
                Launchpad Name: {item.launchpad.name}
              </Typography>
              </DataCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default LaunchTable;

