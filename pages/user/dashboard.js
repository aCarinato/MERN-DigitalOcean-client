import { useContext } from 'react';
import { UserContext } from '../../context';
import UserRoute from '../../components/routes/UserRoute';
import CreatePostForm from '../../components/forms/CreatePostForm';
import { useRouter, userRouter } from 'next/router';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Home() {
  const [state, setState] = useContext(UserContext);
  // state
  const [content, setContent] = useState('');
  // route
  const router = useRouter();

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log('post => ', content);
    try {
      const { data } = await axios.post('/create-post', { content });
      // console.log('create post response => ', data);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success('Post created');
        setContent('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5">
          <div className="col">
            <h1>Dashboard page</h1>
          </div>
        </div>
      </div>

      <div className="row py-3">
        <div className="col-md-8">
          <CreatePostForm
            content={content}
            setContent={setContent}
            postSubmit={postSubmit}
          />
        </div>
        <div className="col-md-4">Sidebar</div>
      </div>
    </UserRoute>
  );
}
