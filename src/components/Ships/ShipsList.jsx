import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ShipsTable from "./ShipsTable.jsx";
import Pagination from "../Common/Pagination.jsx";
import NoPage from "../Common/NoPage.jsx";

const ShipsList = () => {
  const { page } = useParams();
  const url = "/ships/page/";
  const [shipsData, setShipsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const requestBody = {
          options: {
            limit: 10,
            page: parseInt(page),
            populate: ["launches"],
          },
        };
        const ships = await axios.post(
          `https://api.spacexdata.com/v4/ships/query`,
          requestBody
        );
        setShipsData(ships.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [page]);

  if (page <= 0 || page > shipsData.totalPages) {
    return <NoPage />;
  }

  if (loading) {
    return (
      <div>
        <h1>Loading.....</h1>
      </div>
    );
  } else {
    return (
      <div>
        <Pagination url={url} lastPage={shipsData.totalPages} />
        <div className="launch-table-wrapper">
          <ShipsTable shipsData={shipsData.docs} />
        </div>
      </div>
    );
  }
};

export default ShipsList;
