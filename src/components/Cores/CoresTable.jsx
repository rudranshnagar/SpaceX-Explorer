import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

const CoresTable = (props) => {
  return (
    <Grid container className="coreslist-grid-container" spacing={5}>
      {props.coresData.map((item) => (
        <Grid item key={item.id} xs={12} md={6} lg={4}>
          <Card sx={{ height: 300, width: 450, margin: "0px 25px 25px 25px" }}>
            
            <CardContent sx={{ maxHeight: 200, overflow: "auto" }}>
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
                Status: {item.status}
                <br/>
                Last Update: {(item.last_update === null || item.last_update.trim().length === 0) ? "Not available" : item.last_update}
              
              
              </Typography>
              



            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CoresTable;

