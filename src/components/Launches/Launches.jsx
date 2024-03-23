import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid } from "@mui/material";
import YoutubeEmbed from "../Common/YoutubeEmbed";
import PayloadsTable from "../Payloads/PayloadsTable";
import NoPage from "../Common/NoPage";


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
            populate: [
              "payloads",
              "rocket",
              "launchpad",
              {
                path: "cores",
                populate: {
                  path: "core",
                },
              },
              "ships",
            ],
          },
        };

        const launch = await axios.post(
          `https://api.spacexdata.com/v4/launches/query`,
          requestBody
        );
        const date = new Date(launch.data.docs[0].date_utc);
        const options = { month: "long", day: "numeric", year: "numeric" };
        const formattedDate = date
          .toLocaleDateString("en-US", options)
          .toUpperCase();
        launch.data.docs[0].date_utc = formattedDate;
        setLaunchData(launch.data.docs[0]);
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
        {launchData.length === 0 ? (
          <NoPage />
        ) : (
          <div className="container-launch">
            <YoutubeEmbed id={launchData.links.youtube_id} />
            <h2>{launchData.date_utc}</h2>
            <h1>{launchData.name} Mission</h1>
            <h3>{launchData.details || "Details to Be Updated"}</h3>
            {launchData.links.article && (
              <a href={launchData.links.article}>Link to Article</a>
            )}
            <br />
            {launchData.links.wikipedia.length > 0 ? (
              <a href={launchData.links.wikipedia}>Link to wikipedia</a>
            ) : (
              ""
            )}
            <div className="img-g">
              <img
                src={launchData.rocket.flickr_images[0]}
                width={"600vw"}
                height={"400vh"}
              />
              <img
                src={launchData.launchpad.images.large[0]}
                width={"600vw"}
                height={"400vh"}
              />
            </div>
            <h3>
            Launch Pad: <t/>
            <a href={`/launchpads/${launchData.launchpad.id}`}>
             {launchData.launchpad.full_name}
            </a>
            </h3>
            <h3>Details: {launchData.launchpad.details}</h3>
            <h3>Region: {launchData.launchpad.region}</h3>
            <p>Flight Number: {launchData.flight_number}</p>
            {launchData.rocket && (
              <a href={`/rockets/${launchData.rocket.id}`}>
                Check out {launchData.rocket.name}
              </a>
            )}
            {launchData.payloads.length > 0 ? <h3>Payloads: </h3> : ""}
            <ol>
              {launchData.payloads.length > 0
                ? launchData.payloads.map((item) => (
                    <li key={item.id}>
                      <a href={`/payloads/${item.id}`}>Check out {item.name}</a>
                    </li>
                  ))
                : ""}
            </ol>
            {launchData.ships.length > 0 ? <h3>Related Ships: </h3> : ""}
            <ol>
              {launchData.ships &&
                launchData.ships.map((item) => (
                  <li key={item.id}>
                    <a href={`/ships/${item.id}`}>Check out {item.name}</a>
                  </li>
                ))}
            </ol>
            {launchData.cores && <h3>Cores carried: </h3>}
            <ol>
              {launchData.cores &&
                launchData.cores.map((item) => (
                  <li key={item.id}>
                    <a href={`/cores/${item.core.id}`}>
                      Check out {item.core.serial}
                    </a>
                  </li>
                ))}
            </ol>
            
          </div>
        )}
      </div>
    );
  }
};

export default Launches;
