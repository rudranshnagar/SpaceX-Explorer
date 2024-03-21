import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";

const Pagination = ({ url, lastPage }) => {
  const navigate = useNavigate();
  const { page } = useParams();

  const prevPage = () => {
    if (parseInt(page) > 1) {
      navigate(`${url}${parseInt(page) - 1}`);
    }
  };

  const nextPage = () => {
    if (parseInt(page) < lastPage) {
      navigate(`${url}${parseInt(page) + 1}`);
    }
  };

  return (
    <div className="pagination-div">
      <Button
        className={`${
          parseInt(page) <= 1 ? "hide-button" : ""
        } page-button prev-button`}
        variant="contained"
        onClick={prevPage}
      >
        Previous
      </Button>

      <Button
        className={`${
          parseInt(page) > lastPage - 1 ? "hide-button" : ""
        } page-button next-button`}
        variant="contained"
        onClick={nextPage}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
