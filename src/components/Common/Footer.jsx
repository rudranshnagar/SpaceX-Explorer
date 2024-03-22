import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Grid, Typography } from "@mui/material";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import CameraIcon from "@mui/icons-material/Camera";
import XIcon from "@mui/icons-material/X";

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
        <div className="logg">
        <h1>{companyData.name}</h1>
        <CopyrightOutlinedIcon /> 
        </div>
        <div className="add">
        <h3>{companyData.headquarters.address}, {companyData.headquarters.city}, {companyData.headquarters.state}</h3>
        </div>
        <div className="summ">
          {companyData.summary}
        </div>
        <br />
        <div className="social-links-dev">
        <div className="footer-twitter-icon">
            <a href={companyData.links.twitter}>
              <XIcon />
            </a>
          </div>
        <div className="footer-website-icon">
            <a href={companyData.links.website}>
              <LanguageIcon />
            </a>
          </div>
          <div className="footer-ceo-twitter-icon">
            <a href={companyData.links.twitter}>
              <XIcon />
            </a>
          </div>
          <div className="footer-flickr-icon">
            <a href={companyData.links.flickr}>
              <CameraIcon />
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default Company;