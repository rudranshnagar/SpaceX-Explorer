import { useParams } from 'react-router-dom';
const Rockets = () => {
  const {id} = useParams();
  return (
    <div>
      <p>This is the Rockets page</p>      
    <h1>{id}</h1>
    </div>
  );
}

export default Rockets;
