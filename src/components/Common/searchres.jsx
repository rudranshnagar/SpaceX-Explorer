import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import React from 'react';

const Searchres = () => {
    const { searchTerm } = useParams();
    const [searchdata, setsearchdata] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    },[]);
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
          </div>
        );
      }
}

export default Searchres;