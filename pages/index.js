import { useContext } from 'react';
import { UserContext } from '../context';

const Home = () => {
  const [state, setState] = useContext(UserContext);
  return (
    <div className="container">
      <div className="row">
        <div className="column">
          <h1 className="display-1 text-center py-5">Home pahe</h1>
          {JSON.stringify(state)}
          <p>{process.env.NEXT_PUBLIC_API}</p>
          {/* <img src="/images/sample.jpg" alt="image"></img> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
