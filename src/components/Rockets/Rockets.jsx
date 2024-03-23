import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NoPage from "../Common/NoPage";
import YoutubeEmbed from "../Common/YoutubeEmbed";
import { CleanHands } from "@mui/icons-material";
import { Typography } from "@mui/material";

const currency = (cost) => {
  if (typeof cost !== "number" || isNaN(cost)) {
    return "Not Available";
  }

  const c = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cost);

  return c;
};
const Rockets = () => {
  const { id } = useParams();
  const [rocketsData, setRocketsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const requestBody = {
          query: {
            _id: `${id}`,
          },
          options: {},
        };
        const rockets = await axios.post(
          `https://api.spacexdata.com/v4/rockets/query`,
          requestBody
        );
        if (rockets.data.docs.length === 0) {
          setRocketsData(null);
        } else {
          const date = new Date(rockets.data.docs[0].first_flight);
          const options = { month: "long", day: "numeric", year: "numeric" };
          const formattedDate = date
            .toLocaleDateString("en-US", options)
            .toUpperCase();
          rockets.data.docs[0].first_flight = formattedDate;
          setRocketsData(rockets.data.docs[0]);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div>
        <h1>Loading.....</h1>
      </div>
    );
  } else {
    return (
      <div>
        {rocketsData.length === 0 ? (
          <NoPage />
        ) : (
          <div className="container-launch">
            {rocketsData.flickr_images[0] && (
              <img
                src={rocketsData.flickr_images[0]}
                alt="rocket"
                width="1860vw"
                height="auto"
              />
            )}
            <h4>{rocketsData.first_flight}</h4>
            <h1>{rocketsData.name}</h1>
            <h4>{rocketsData.type}</h4>
            <ul>
              <li> Height: {rocketsData.height.meters} meters</li>
              <li> Diameter: {rocketsData.diameter.meters} meters</li>
              <li> Mass: {rocketsData.mass.lb} lbs</li>
              <li> Cost per launch: {currency(rocketsData.cost_per_launch)}</li>
              <li> Country: {rocketsData.country}</li>
              <li> Details: {rocketsData.description}</li>
            </ul>
            {rocketsData.flickr_images.map((item) => (
              <img
                src={item}
                alt="rocket"
                width="1860vw"
                height="900vh"
              />
            ))}
          </div>
          )}
      </div>
    );
  }
};

export default Rockets;
