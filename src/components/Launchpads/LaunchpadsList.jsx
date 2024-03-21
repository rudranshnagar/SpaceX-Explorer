import { useParams } from "react-router-dom";
const LaunchpadsPage = () => {
  const { page } = useParams();
  return (
    <div>
      <p>This is the Launchpads page page</p>
      <h1>{page}</h1>
    </div>
  );
};

export default LaunchpadsPage;
