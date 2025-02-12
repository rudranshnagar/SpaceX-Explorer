import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PayloadsTable from "./PayloadsTable.jsx";
import Pagination from "../Common/Pagination.jsx";
import NoPage from "../Common/NoPage.jsx";
import ErrorPage from "../Common/ErrorPage.jsx";

const LaunchesList = () => {
  const { page } = useParams();
  const url = "/payloads/page/";
  const [payloadsData, setPayloadsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [e, setE] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const requestBody = {
          options: {
            limit: 10,
            page: parseInt(page),
            populate: [
              {
                path: "launch",
                populate: {
                  path: "rocket",
                },
              },
            ],
          },
        };
        const response = await axios.post(
          `https://api.spacexdata.com/v4/payloads/query`,
          requestBody
        );
        setPayloadsData(response.data);
        setLoading(false);
      } catch (error) {
        setE(true)
      }
    }

    fetchData();
  }, [page]);

  if (isNaN(page) || page <= 0 || page > payloadsData.totalPages) {
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
        <Pagination url={url} lastPage={payloadsData.totalPages} />
        <div className="launch-table-wrapper">
          <PayloadsTable payloadsData={payloadsData.docs} />
        </div>
      </div>
    );
  }
};

export default LaunchesList;
