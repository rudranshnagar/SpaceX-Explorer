import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NoPage from "../Common/NoPage";
import { Container, Grid, Typography } from "@mui/material";

function lbsToTons(weightInLbs) {
  const tons = weightInLbs / 2000;
  return tons;
}

const Ships = () => {
  const { id } = useParams();
  const [shipsData, setShipsData] = useState([]);
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
        const ships = await axios.post(
          `https://api.spacexdata.com/v4/ships/query`,
          requestBody
        );
        setShipsData(ships.data.docs[0]);
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
        {shipsData.length !== 0 ? (
          <div className="container-launch">
          {console.log(shipsData)}
            {shipsData.image && (
              <img src={shipsData.image} alt="ship" width="1000" height="700" />
            )}
            <h3>{shipsData.year_built}</h3>
            <h1>{shipsData.name}</h1>
            <Typography variant="body2" color="white" textAlign={"left"}>
              Docked at {shipsData.home_port}, {shipsData.name} is a{" "}
              {shipsData.type} ship built in the year {shipsData.year_built}{" "}
              weighing upto {lbsToTons(shipsData.mass_lbs)} tons.
            </Typography>
            <h4>Roles Assigned:</h4>
            <ul>
              {shipsData.roles.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <Typography variant="body2" color="white" textAlign={"left"}>
              <a href={shipsData.link}>Read more </a>
            </Typography>
            <h4>Involved in the below launches:</h4>
            <ol>
              {shipsData.launches.map((item, index) => (
                <li key={index}>
                <a href={"/launches/"+item.id}>
                {item.name}
                </a>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <NoPage />
        )}
      </div>
    );
  }
};

export default Ships;