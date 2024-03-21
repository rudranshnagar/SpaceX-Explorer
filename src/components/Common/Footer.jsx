import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Grid, Typography } from "@mui/material";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";

const Company = () => {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const company = await axios.get(`https://api.spacexdata.com/v4/company`);
      setCompanyData(company.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <div className="footer">
        <h1>This is a footer</h1>
      </div>
    );
  }
};

export default Company;
