import { useNavigate } from "react-router-dom";
import React from "react";
import { Card, CardContent, CardMedia, CardActionArea, Button } from "@mui/material";

const DataCard = ({ children, imageLink, buttonLink, id }) => {
  const navigate = useNavigate();

  const altLink =
"https://upload.wikimedia.org/wikipedia/commons/5/5a/No_image_available_500_x_500.svg"

const handleCardClick = () => {
navigate(`/${buttonLink}/` + id)
};

  return (
    <div>
      <Card
        sx={{
          backgroundColor: "transparent",
          color: "white",
          border: "1px solid white",
        }}
      >
      <CardActionArea onClick={handleCardClick}>
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
        </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default DataCard;
