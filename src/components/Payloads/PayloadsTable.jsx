import { Grid, Typography } from "@mui/material";
import DataCard from "../Common/DataCard";

const PayloadsTable = (props) => {
  return (
    <Grid container className="payloadslist-grid-container" spacing={5}>
      {props.payloadsData.map((item) => (
        <Grid item key={item.id} xs={12} md={6} lg={4}>
        <DataCard  buttonLink={"payloads"} id={item.id}>
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
                Type: {item.type} <br />
                Mass: {item.mass_lbs}{" lbs"} <br />
                Orbit: {item.orbit} <br />
                Launch:{" "}
                {item.launch && item.launch.name
                  ? item.launch.name
                  : "Not available"}{" "}
                <br />
                Rocket: {" "}
                {item.launch && item.launch.rocket && item.launch.rocket.name
                  ? item.launch.rocket.name
                  : "Not available"}{" "}
                <br />
              </Typography>
              {item.customers.map((customer, index) => (
                <Typography
                  key={index}
                  variant="body2"
        
                  textAlign={"left"}
                >
                  Customer Name: {customer}
                </Typography>
              ))}
              </DataCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default PayloadsTable;
