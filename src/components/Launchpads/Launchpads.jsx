import { useParams } from "react-router-dom";
const Launchpads = () => {
  const { id } = useParams();
  return (
    <div>
      <p>This is the Launchpads page</p>
      <h1>{id}</h1>
    </div>
  );
};

export default Launchpads;
