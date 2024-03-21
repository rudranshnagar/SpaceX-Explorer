import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid } from "@mui/material";
import YoutubeEmbed from "../YoutubeEmbed";

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
            populate: ["payloads", "rocket", "launchpad"],
          },
        };
        const launch = await axios.post(
          `https://api.spacexdata.com/v4/launches/query`,
          requestBody
        );
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
      <Grid container className="launches-main-container">
      <Grid item className="grid-youtube">
      <YoutubeEmbed id={launchData.links.youtube_id} />
      </Grid>
        
      </Grid>
    );
  }
};

export default Launches;
