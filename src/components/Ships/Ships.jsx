import { useParams } from "react-router-dom";
const Ships = () => {
  const { id } = useParams();
  return (
    <div>
      <p>This is the Ships page</p>
      <h1>{id}</h1>
    </div>
  );
};

export default Ships;
