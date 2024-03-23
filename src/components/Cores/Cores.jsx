import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import YoutubeEmbed from "../Common/YoutubeEmbed";
import NoPage from "../Common/NoPage";

const Cores = () => {
  const { id } = useParams();
  const [coresData, setCoresData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const requestBody = {
          query: {
            _id: `${id}`,
          },
          options: {
            populate: ["launches"],
          },
        };
        const cores = await axios.post(
          `https://api.spacexdata.com/v4/cores/query`,
          requestBody
        );
        setCoresData(cores.data.docs[0]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
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
      {coresData.length === 0 ? (
        <NoPage />
      ) : (
      <div className="container-launch">
        <YoutubeEmbed id={coresData.launches[0].links.youtube_id} />
        <h1>{coresData.serial}</h1>
        <h3>Last update: {coresData.last_update || "Details to Be Updated"}</h3>
            <h3> About the Launches:</h3>
        <ol>
          {coresData.launches.map((launch) => (
            <li key={launch.id}>
              {launch.name}:
            <p>{launch.details || "Details to Be Updated"}</p>
                <a href={`/launches/${launch.id}`}>
                  Check out the launch {launch.name}
                </a>
                <br/>
                <a href={launch.links.wikipedia}>
                  Launch Wiki Page
                </a>
                <br/>
          <br/>
            </li>
          
          ))}
        </ol>
      </div>
      )}
      </div>
    );
    
  }
};

export default Cores;

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
