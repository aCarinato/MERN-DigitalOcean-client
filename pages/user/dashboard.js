import { useContext } from 'react';
import { UserContext } from '../../context';
import UserRoute from '../../components/routes/UserRoute';

export default function Home() {
  const [state, setState] = useContext(UserContext);
  return (
    <UserRoute>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>Dashboard page</h1>
          </div>
        </div>
      </div>
    </UserRoute>
  );
}
