import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid } from "@mui/material";
import YoutubeEmbed from "../YoutubeEmbed";
import PayloadsTable from "../Payloads/PayloadsTable"

const Launches = () => {
  const { id } = useParams();
  const [launchData, setLaunchData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const requestBody = {
          query: {
            _id: `${id}`,
          },
          options: {
            populate: ["payloads", "rocket", "launchpad","cores"],
          },
        };
        const launch = await axios.post(
          `https://api.spacexdata.com/v4/launches/query`,
          requestBody
        );
        const date = new Date(launch.data.docs[0].date_utc);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options).toUpperCase();
        launch.data.docs[0].date_utc = formattedDate
        setLaunchData(launch.data.docs[0]);
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
      <div className="container-launch">
<<<<<<< Updated upstream
        
=======
>>>>>>> Stashed changes
        <YoutubeEmbed id={launchData.links.youtube_id} />
        <h2>{launchData.date_utc}</h2>
        <h1>{launchData.name} Mission</h1>
        <h3>{launchData.details || "Details to Be Updated"}</h3>
        <a href={launchData.links.article}>Link to Article</a>
        <p>{launchData.rocket.name}</p>
        <div className="img-g">
          <img src={launchData.rocket.flickr_images[0]} width={"600vw"} height={"400vh"} />
          <img src={launchData.launchpad.images.large[0]} width={"600vw"} height={"400vh"}/>
        </div>
        <h3>Launch Pad: {launchData.launchpad.full_name}</h3>
        <h3>Details: {launchData.launchpad.details}</h3>
        <h3>Region: {launchData.launchpad.region}</h3>
        <p>Flight Number: {launchData.flight_number}</p>
      </div>
    );
  }
};

export default Launches;