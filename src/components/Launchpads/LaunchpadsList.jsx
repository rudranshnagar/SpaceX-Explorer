import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LaunchpadsTable from "./LaunchpadsTable.jsx";
import Pagination from "../Common/Pagination.jsx";
import NoPage from "../Common/NoPage.jsx";
import ErrorPage from "../Common/ErrorPage.jsx";

const LaunchpadList = () => {
  const { page } = useParams();
  const url = "/launchpads/page/";
  const [launchpadData, setLaunchpadData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [e, setE] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const requestBody = {
          options: {
            limit: 10,
            page: parseInt(page),
            populate: ["rockets", "launches"],
          },
        };
        const launchpad = await axios.post(
          `https://api.spacexdata.com/v4/launchpads/query`,
          requestBody
        );
        setLaunchpadData(launchpad.data);
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
  if (page <= 0 || page > launchpadData.totalPages) {
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
        <Pagination url={url} lastPage={launchpadData.totalPages} />
        <div className="launch-table-wrapper">
          <LaunchpadsTable launchpadData={launchpadData.docs} />
        </div>
      </div>
    );
  }
};

export default LaunchpadList;
