import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NoPage from "../Common/NoPage";
import { Container, Grid, Typography } from "@mui/material";
import YoutubeEmbed from "../YoutubeEmbed";
import PayloadsTable from "../Payloads/PayloadsTable";

const Launchpads = () => {
  const { id } = useParams();
  const [launchpadsData, setLaunchpadsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const requestBody = {
          query: {
            _id: `${id}`,
          },
          options: {
            populate: ["rockets", "launches"],
          },
        };
        const launchpads = await axios.post(
          `https://api.spacexdata.com/v4/launchpads/query`,
          requestBody
        );
        setLaunchpadsData(launchpads.data.docs[0]);
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
        {launchpadsData ? (
          <div className="container-launch">
            {launchpadsData.images.large[0] && (
              <img
                src={launchpadsData.images.large[0]}
                alt="launchpad"
                width="1866vw"
                height="850vh"
              />
            )}
            <h3>
              {launchpadsData.locality}, {launchpadsData.region}
            </h3>
            <h1>{launchpadsData.full_name}</h1>
            <h4>a.k.a. {launchpadsData.name}</h4>
            <Typography variant="body2" color="white" textAlign={"left"}>
              {launchpadsData.details}
            </Typography>
            <Typography variant="body2" color="white" textAlign={"left"}>
              Curruntly it is {launchpadsData.status}
            </Typography>
            <h4>Rockets launched:</h4>
            <ol>
              {launchpadsData.rockets.map((item, index) => (
                <li key={index}>
                  <a href={"/rockets/" + item.id}>{item.name}</a>
                </li>
              ))}
            </ol>
            {launchpadsData.launches.length > 0 && (
              <div>
                <h4>Involved in the below launches:</h4>
                <ol>
                  {launchpadsData.launches.map((item, index) => (
                    <li key={index}>
                      <a href={"/launches/" + item.id}>{item.name}</a>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ) : (
          <NoPage />
        )}
      </div>
    );
  }
};

export default Launchpads;

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
