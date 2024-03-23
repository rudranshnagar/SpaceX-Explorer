import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import YoutubeEmbed from "../Common/YoutubeEmbed";
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
            <h5>
              <ul>
                {payloadsData.mass_lbs && (
                  <li>Weight: {payloadsData.mass_lbs} </li>
                )}

                {payloadsData.orbit && <li>Orbit: {payloadsData.orbit} </li>}

                {payloadsData.regime && <li>Regime: {payloadsData.regime} </li>}
              </ul>
            </h5>
            <h3> About the Launch:</h3>
            <p>{payloadsData.launch.details || "Details to Be Updated"}</p>
            <ul>
              <li key={payloadsData.launch.id}>
                <a href={`/launches/${payloadsData.launch.id}`}>
                  Check out the launch {payloadsData.launch.name}
                </a>
              </li>
              <li>
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
