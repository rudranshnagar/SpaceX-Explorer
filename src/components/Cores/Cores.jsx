import { useParams } from 'react-router-dom';
const Cores = () => {
  const {id} = useParams();
  return (
    <div>
      <p>This is the Cores page</p>      
    <h1>{id}</h1>
    </div>
  );
}

export default Cores;
