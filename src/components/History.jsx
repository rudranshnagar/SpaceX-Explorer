import { useEffect, useState } from "react";
import axios from "axios";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from "styled-components";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const imageUrls = {
    1: "https://www.reuters.com/resizer/v2/https%3A%2F%2Fcloudfront-us-east-2.images.arcpublishing.com%2Freuters%2FEHTWJ3A3AFLNXFUWRTIKESHJ64.jpg?auth=1cd57f7fb2f3603d9f2ce748ad99e352b44714c8af1783b093fea341e59d030c&width=1080&quality=80",
    2: "https://techcrunch.com/wp-content/uploads/2021/04/spacex-crew-2-launch.gif?w=1390&crop=1",
    3: "https://i0.wp.com/spacenews.com/wp-content/uploads/2020/11/crew1-launch2.jpg?w=879&ssl=1",
    4: "https://cdn.mos.cms.futurecdn.net/WnWRoi4xh3HPhUQZcSoSxf.jpg",
    5: "https://i0.wp.com/spacenews.com/wp-content/uploads/2022/11/Fgfe6qGUoAAqm_P-scaled.jpeg?resize=1200%2C800&ssl=1",
    6: "https://helios-i.mashable.com/imagery/articles/04PnnaL5MQzw0tiExWjmDie/images-3.fill.size_2000x1334.v1611685306.jpg",
    7: "https://preview.redd.it/vv7rwrsskps81.jpg?width=1080&crop=smart&auto=webp&s=599e741a8c15202b5c605bbc0b507358e33714d4",
    8: "https://cdn.mos.cms.futurecdn.net/LabsC3rL54tiCmPyg7q6hT.jpg",
    9: "https://www.teslarati.com/wp-content/uploads/2018/09/Mr-Steven-Falcon-fairing-ops-091918-Pauline-Acalin-11c-1.jpg",
    10: "http://spaceflight101.com/dragon-spx11/wp-content/uploads/2017/05/DA7Z5bsVoAAqLFm.jpg",
    11: "https://media.wired.com/photos/5cad313b3efe9d38033ce7fa/master/w_1920,c_limit/40288614473_c9a9a2f4d7_o.jpg",
    12: "https://cdn.mos.cms.futurecdn.net/P8YtyD4GpoeXFpuTsNRmW8-970-80.jpg",
    13: "https://interestingengineering.com/_next/image?url=https%3A%2F%2Fcms.interestingengineering.com%2Fwp-content%2Fuploads%2F2024%2F03%2FStarship-1.jpeg&w=1200&q=75",
    14: "https://spaceflightnow.com/wp-content/uploads/2019/04/D36nn-8UcAAnFu7-2.jpg",
    15: "https://cdn.mos.cms.futurecdn.net/YbJCEFreCgbj5cosTLPwWX.jpg",
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const history = await axios.get(`https://api.spacexdata.com/v4/history`);
      setHistoryData(history.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const FullPageBackground = styled.div`
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
    display: flex;
    color: white;
    overflow: hidden;
    z-index: 2;

    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 15%;
      background: rgba(0, 0, 0, 0.3); 
      z-index: 0; 
      box-shadow: 0px -4vh 30px rgba(0, 0, 0, 0.3); 
      border-radius: inherit;
    }
  `;

  const ContentWrapper = styled.div`
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 3;
    text-align: left;
  `;

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <div className="history">
        {historyData.map((item, index) => (
          <FullPageBackground
            key={index}
            style={{ backgroundImage: `url(${imageUrls[index + 1]})` }}
          >
            <ContentWrapper>
              <h1>{item.title}</h1>
              <p>{item.details}</p>
            </ContentWrapper>
            <div className="expand-more-icon">
            <ExpandMoreIcon fontSize="large"/>
            </div>
          </FullPageBackground>
        ))}
      </div>
    );
  }
};

export default History;
