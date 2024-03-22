import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import YoutubeEmbed from "../YoutubeEmbed";
import { CleanHands } from "@mui/icons-material";
import { Typography } from "@mui/material";
import NoPage from "../Common/NoPage";

const Payloads = () => {
  const { id } = useParams();
  const [payloadsData, setPayloadsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const requestBody = {
          query: {
            _id: `${id}`,
          },
          options: {
            populate: ["launch"],
          },
        };
        const payloads = await axios.post(
          `https://api.spacexdata.com/v4/payloads/query`,
          requestBody
        );
        setPayloadsData(payloads.data.docs[0]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(payloadsData.length);
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
        {payloadsData.length === 0 ? (
          <NoPage />
        ) : (
          <div className="container-launch">
            <YoutubeEmbed id={payloadsData.launch.links.youtube_id} />
            <h4>{payloadsData.type}</h4>
            <h1>{payloadsData.name}</h1>
            <ul>
              <li key={payloadsData.launch.id}>
                Launch Name: {payloadsData.launch.name}
                <br />
                <a href={payloadsData.launch.links.wikipedia}>
                  Launch Wiki Page
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
};

export default Payloads;
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
