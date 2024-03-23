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

