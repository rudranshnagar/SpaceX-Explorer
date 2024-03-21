import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Grid, Typography } from "@mui/material";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import CameraIcon from "@mui/icons-material/Camera";
import XIcon from "@mui/icons-material/X";
import PlaceIcon from '@mui/icons-material/Place';

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
        <div className="footer-left">
          <div className="footer-title">
            <Typography variant="h5" align="center" gutterBottom>
              <div className="cc-symbol">
                <CopyrightOutlinedIcon />
                {companyData.name}
              </div>
            </Typography>
          </div>
          <div className="footer-summary">
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              {companyData.summary}
            </Typography>
          </div>
        </div>
        <div className="footer-center">
            <div className="footer-website-icon">
              <a href={companyData.links.website}>
                <LanguageIcon />
                Official Website
              </a>
            </div>
            <div className="footer-flickr-icon">
              <a href={companyData.links.flickr}>
                <CameraIcon />
                Flickr
              </a> 
            </div>
            <div className="footer-twitter-icon">
              <a href={companyData.links.twitter}>
                <XIcon />
                X
              </a>
            </div>
            <div className="footer-ceo-twitter-icon">
              <a href={companyData.links.twitter}>
                <XIcon />
                Elon Musk
              </a>
            </div>
          
        </div>
        <div className="footer-right">
          <Typography
            fontWeight="bold"
            variant="h5"
            align="center"
            gutterBottom
          >
            <div className="footer-place-icon">
            <PlaceIcon/>
            </div>
          {companyData.headquarters.address} ,{companyData.headquarters.city} ,{companyData.headquarters.state}
          </Typography>
            
        </div>
      </div>
    );
  }
};

export default Company;
