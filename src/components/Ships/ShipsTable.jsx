import { Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DataCard from "../Common/DataCard";

const ShipsTable = (props) => {
  return (
    <Grid container className="shipslist-grid-container" spacing={5}>
      {props.shipsData.map((item) => (
        <Grid item key={item.id} xs={12} md={6} lg={4}>
        <DataCard imageLink={item.image} buttonLink={"ships"} id={item.id}>
          
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
                  
                  textAlign={"left"}
                >
                  Launch Name: {launch.name}
                </Typography>
              ))}
              <Typography
                variant="body2"
                
                textAlign={"left"}
              >
              <Link to={item.link}>Learn More</Link>
              </Typography>
              
          </DataCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default ShipsTable;

