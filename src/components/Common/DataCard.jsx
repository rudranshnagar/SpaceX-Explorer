import React from "react";
import { Card, CardContent, CardMedia, Button } from "@mui/material";

const DataCard = ({ children, imageLink, buttonLink, id }) => {
  const altLink =
"https://upload.wikimedia.org/wikipedia/commons/5/5a/No_image_available_500_x_500.svg"

  return (
    <div>
      <Card
        sx={{
          backgroundColor: "transparent",
          color: "white",
          border: "1px solid white",
        }}
      >
        <CardMedia
          component="img"
          height="500 !important"
          width="500px !important"
          image={imageLink || altLink}
          sx={{
            backgroundColor: "transparent",
          }}
        />
        <CardContent
          sx={{
            height: 200,
            overflow: "auto",
            padding: "16px 16px 16px !important",
          }}
        >
          {children}
          <Button
            variant="contained"
            color="info"
            href={`/${buttonLink}/` + id}
            sx={{ marginTop: "20px" }}
          >
            Show More
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataCard;
