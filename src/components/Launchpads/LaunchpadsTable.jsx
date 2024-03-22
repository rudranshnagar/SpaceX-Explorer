import {
  Grid,
  
  Typography,
  
} from "@mui/material";

import DataCard from "../Common/DataCard";

const LaunchpadsTable = (props) => {
  return (
    <Grid container className="launchpadslist-grid-container" spacing={5}>
      {props.launchpadData.map((item) => (
        <Grid item key={item.id} xs={12} md={6} lg={4}>

        <DataCard imageLink={item.images.large[0]} buttonLink={"launchpads"} id={item.id}>
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
                  
                  textAlign="left"
                >
                  Rocket Name: {rocket.name}
                </Typography>
              ))}
              <ol>
                {item.launches.map((launch, index) => (
                  <Typography
                    key={launch.id}
                    variant="body2"
                    
                    textAlign="left"
                  >
                    <li key={index}> Launch Name: {launch.name}</li>
                  </Typography>
                ))}
              </ol>
          </DataCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default LaunchpadsTable;
