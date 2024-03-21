import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

const PayloadsTable = (props) => {
  return (
    <Grid container className="payloadslist-grid-container" spacing={5}>
      {props.payloadsData.map((item) => (
        <Grid item key={item.id} xs={12} md={6} lg={4}>
          <Card sx={{ height: 300, width: 450, margin: "0px 25px 25px 25px" }}>
            <CardContent
              sx={{
                overflow: "auto",
                height: 750,
                width: 500,
                margin: "0px 25px 25px 25px",
                backgroundColor: "",
              }}
            >
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
                  color="text.secondary"
                  textAlign={"left"}
                >
                  Customer Name: {customer}
                </Typography>
              ))}
              <br />
              <div>
              <Button variant="outlined" href={"/payloads/" + item.id}>Show More</Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PayloadsTable;
