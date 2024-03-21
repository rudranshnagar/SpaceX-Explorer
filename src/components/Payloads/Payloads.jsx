import { useParams } from 'react-router-dom';
const Payloads = () => {
  const {id} = useParams();
  return (
    <div>
      <p>This is the Payloads page</p>      
    <h1>{id}</h1>
    </div>
  );
}

export default Payloads;
