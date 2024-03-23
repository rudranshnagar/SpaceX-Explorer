import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LaunchTable from "./LaunchTable.jsx";
import Pagination from "../Common/Pagination.jsx";
import NoPage from "../Common/NoPage.jsx";
import ErrorPage from "../Common/ErrorPage.jsx";

const LaunchesList = () => {
  const { page } = useParams();
  const url = "/launches/page/";
  const [launchData, setLaunchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [e, setE] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const requestBody = {
          options: {
            limit: 10,
            page: parseInt(page),
            populate: ["payloads", "rocket", "launchpad"],
          },
        };
        const launch = await axios.post(
          `https://api.spacexdata.com/v4/launches/query`,
          requestBody
        );
        setLaunchData(launch.data);
        
        setLoading(false);
      } catch (error) {
        setE(true)
      }
    }
    fetchData();
  }, [page]);

  if (isNaN(page) || page <= 0 || page > launchData.totalPages ) {
    return <NoPage />;
  }
  if(e)
  {
    return <ErrorPage/>
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
        <Pagination url={url} lastPage={launchData.totalPages} />
        <div className="launch-table-wrapper">
          <LaunchTable launchData={launchData.docs} />
        </div>
      </div>
    );
  }
};

export default LaunchesList;
