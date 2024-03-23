import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NoPage from "../Common/NoPage";
import { Container, Grid, Typography } from "@mui/material";

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
        {console.log(launchpadsData)}
        {launchpadsData.length !== 0  ? (
          <div className="container-launch">
            {launchpadsData.images.large[0] && (
              <img
                src={launchpadsData.images.large[0]}
                alt="launchpad"
                width="1000"
                height="700"
              />
            )}
            <h3>
              {launchpadsData.locality}, {launchpadsData.region}
            </h3>
            <h3>latitude: {launchpadsData.latitude} longitude: {launchpadsData.longitude}</h3>
            <h1>{launchpadsData.full_name}</h1>
            <h4>a.k.a. {launchpadsData.name}</h4>
            <Typography variant="body2" color="white" textAlign={"left"}>
              {launchpadsData.details}
            </Typography>
            <Typography variant="body2" color="white" textAlign={"left"}>
              Current Satus: {launchpadsData.status}
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