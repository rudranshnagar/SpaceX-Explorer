import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CoresTable from "./CoresTable.jsx";
import Pagination from "../Common/Pagination.jsx";
import NoPage from "../Common/NoPage.jsx";
import ErrorPage from "../Common/ErrorPage.jsx";

const CoresList = () => {
  const { page } = useParams();
  const url = "/cores/page/";
  const [coresData, setCoresData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [e, setE] = useState(false)

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
        const core = await axios.post(
          `https://api.spacexdata.com/v4/cores/query`,
          requestBody
        );
        setCoresData(core.data);
        setLoading(false);
      } catch (error) {
       setE(true)
      }
    }
    fetchData();
  }, [page]);

  if (isNaN(page) || page <= 0 || page > coresData.totalPages) {
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
        <Pagination url={url} lastPage={coresData.totalPages} />
        <div className="cores-table-wrapper">
          <CoresTable coresData={coresData.docs} />
        </div>
      </div>
    );
  }
};

export default CoresList;
