import { Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import DataCard from "../Common/DataCard";

const CoresTable = (props) => {
  return (
    <Grid container className="coreslist-grid-container" spacing={5}>
      {props.coresData.map((item) => (
        <Grid item key={item.id} xs={12} md={6} lg={4}>
          
        <DataCard buttonLink={"cores"} id={item.id}>
          
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                textAlign={"left"}
              >
                Serial: {item.serial}
              </Typography>

              {item.launches.map((launch) => (
                <Typography
                  key={launch.id}
                  variant="body2"
  
                  textAlign={"left"}
                >
                  Launch Name: {launch.name}
                </Typography>
              ))}

              <Typography
                variant="body2"

                textAlign={"left"}
              >
                Status: {item.status}
                <br/>
                Last Update: {(item.last_update === null || item.last_update.trim().length === 0) ? "Not available" : item.last_update}
              
              </Typography>

             </DataCard>
            
        </Grid>
      ))}
    </Grid>
  );
};

export default CoresTable;

