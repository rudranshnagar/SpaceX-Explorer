import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NoPage from "../Common/NoPage";
import YoutubeEmbed from "../YoutubeEmbed";
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
        console.log(error);
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
        {rocketsData ? (
          <div className="container-launch">
            {rocketsData.flickr_images[0] && (
              <img
                src={rocketsData.flickr_images[0]}
                alt="rocket"
                width="1860"
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
            {rocketsData.flickr_images[1] && (
              <img
                src={rocketsData.flickr_images[1]}
                alt="rocket"
                width="1860"
                height="900"
              />
            )}
            {rocketsData.flickr_images[2] && (
              <img
                src={rocketsData.flickr_images[2]}
                alt="rocket"
                width="1860"
                height="900"
              />
            )}
            {rocketsData.flickr_images[3] && (
              <img
                src={rocketsData.flickr_images[3]}
                alt="rocket"
                width="1860"
                height="900"
              />
            )}
          </div>
        ) : (
          <NoPage />
        )}
      </div>
    );
  }
};

export default Rockets;
{
  /* <h1>Launch Information</h1>
        <div className="l-i">
        <div className="heading-i">
          <img src={launchData.links.patch.small} width={"200px"}/>
          <h1>{launchData.name}</h1>
        </div>
        <h3>Date_utc: {launchData.date_utc}</h3>
        <h3>Details: {launchData.details|| "N/A"}</h3>
        <a href={launchData.links.article}>Link to Article</a>
        </div>
        <br />
        <h1>Launch Pad Information</h1>
        <div className="l-i">
          <div className="heading-i">
          <img src={launchData.launchpad.images.large[0]} width={"600vw"} height={"400vh"}/>
          <h1>
          {launchData.launchpad.full_name}
          </h1>
          </div>
          <h3>Details: {launchData.launchpad.details}</h3>
          <h3>Region: {launchData.launchpad.region}</h3>
        </div>
        <h2>Rocket Information</h2>
        <p>{launchData.rocket.name}</p>
        <img src={launchData.rocket.flickr_images[0]} alt="" />
        <PayloadsTable payloadsData={launchData.payloads} />
        <p>Flight Number: {launchData.flight_number}</p> */
}
