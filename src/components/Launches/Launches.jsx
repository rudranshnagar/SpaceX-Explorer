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
        {console.log(launchData)}
        <YoutubeEmbed id={launchData.links.youtube_id} />
        <h2>{launchData.date_utc}</h2>
        <h1>{launchData.name} Mission</h1>
        <h3>{launchData.details|| "Details to Be Updated"}</h3>
      </div>
    );
  }
};

export default Launches;

{/* <h1>Launch Information</h1>
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
        <p>Flight Number: {launchData.flight_number}</p> */}
