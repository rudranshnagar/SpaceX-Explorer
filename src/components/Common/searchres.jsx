import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import RocketsTable from "../Rockets/RocketsTable";
import PayloadsTable from "../Payloads/PayloadsTable";
import CoresTable from "../Cores/CoresTable";
import React from "react";

const Searchres = () => {
  const { searchTerm } = useParams();
  const [searchData, setSearchData] = useState({});
  const [loading, setLoading] = useState(true);
 
  async function fetchData() {
    try {
      const requestBody = 
      {
        query: {
            name: {
                $regex: searchTerm?.trim() || " ",
                $options: "i"
            }
        }
    }
    const requestBodyCores = 
    {
      query: {
          serial: {
              $regex: searchTerm?.trim() || " ",
              $options: "i"
          }
      }
  }
      const rockets = await axios.post(
        `https://api.spacexdata.com/v4/rockets/query`,
        requestBody
      );
      const payloads = await axios.post(
        `https://api.spacexdata.com/v4/payloads/query`,
        requestBody
      );
      const cores = await axios.post(
        `https://api.spacexdata.com/v4/cores/query`,
        requestBodyCores
      );

      setSearchData({rockets: rockets.data.docs , payloads: payloads.data.docs, cores: cores.data.docs});
      setLoading(false);

    } catch (error) {
      console.log(error);
    }
  }
 
  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  if (loading) {
    return (
      <div>
        <h1>Loading.....</h1>
      </div>
    );
  } else {
    return (
      <div className="searchres">
        <h1>Search Results for "{searchTerm}"</h1>
        <h1>Rockets result:</h1>
        {searchData.rockets.length > 0 ? (
          <RocketsTable rocketsData={searchData.rockets} />
        ) : (
          <h4>"No data found"</h4>
        )}
        <h1>Payloads result:</h1>
        {searchData.payloads.length > 0 ? (
          <PayloadsTable payloadsData={searchData.payloads} />
        ) : (
          <h4>"No data found"</h4>
        )}
        <h1>Cores result:</h1>
        {searchData.cores.length > 0 ? (
          <CoresTable coresData={searchData.cores} />
        ) : (
          <h4>"No data found"</h4>
        )}
      </div>
    );
  }
};

export default Searchres;
