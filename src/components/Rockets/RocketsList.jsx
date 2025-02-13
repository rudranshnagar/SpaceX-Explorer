import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import RocketsTable from "./RocketsTable.jsx";
import Pagination from "../Common/Pagination.jsx";
import NoPage from "../Common/NoPage.jsx";
import ErrorPage from "../Common/ErrorPage.jsx";

const RocketsList = () => {
  const { page } = useParams();
  const url = "/rockets/page/";
  const [rocketsData, setRocketsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [e, setE] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const requestBody = {
          options: {
            limit: 10,
            page: parseInt(page),
          },
        };
        const rockets = await axios.post(
          `https://api.spacexdata.com/v4/rockets/query`,
          requestBody
        );
        setRocketsData(rockets.data);
        setLoading(false);
      } catch (error) {
        setE(true)
        
      }
    }
    fetchData();
  }, [page]);

  if(e)
  {
    return <ErrorPage/>
  }
  if (isNaN(page) || page <= 0 || page > rocketsData.totalPages) {
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
        
        <Pagination url={url} lastPage={rocketsData.totalPages} />
        <div className="rockets-table-wrapper">
          <RocketsTable rocketsData={rocketsData.docs} />
        </div>
      </div>
    );
  }
};
export default RocketsList;
