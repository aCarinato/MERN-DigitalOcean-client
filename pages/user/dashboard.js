import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context';
import UserRoute from '../../components/routes/UserRoute';
import PostForm from '../../components/forms/PostForm';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import PostList from '../../components/cards/PostList';
import People from '../../components/cards/People';

export default function Home() {
  const [state, setState] = useContext(UserContext);
  // post content
  const [content, setContent] = useState('');
  // image
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false); // when the image is loading show the loading spinner
  const [posts, setPosts] = useState([]);
  // people
  const [people, setPeople] = useState([]);

  // route
  const router = useRouter();

  useEffect(() => {
    if (state && state.token) {
      // newsFeed();
      fetchUserPosts();
      findPeople();
    }
  }, [state && state.token]);

  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get('/user-posts');
      console.log('from fetchUserPost. data => ', data);
      setPosts(data);
      console.log('from fetchUserPost. posts (setPosts(data)) => ', posts);
    } catch (err) {
      console.log(err);
    }
  };

  const findPeople = async () => {
    try {
      const { data } = await axios.get('/find-people');
      setPeople(data);
      console.log('people => ', people);
    } catch (err) {
      console.log(err);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log("post => ", content);
    try {
      const { data } = await axios.post('/create-post', { content, image });
      console.log('create post response => ', data);
      if (data.error) {
        toast.error(data.error);
      } else {
        fetchUserPosts();
        toast.success('Post created');
        setContent('');
        setImage({});
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData(); // FormData is available in browser environment
    formData.append('image', file);
    // console.log([...formData]);
    setUploading(true);
    try {
      const { data } = await axios.post('/upload-image', formData);
      console.log('uploaded image => ', data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm(
        'Are you sure you want to delete the post?'
      );
      if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.success('Post deleted');
      fetchUserPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async (user) => {
    // console.log("add this user to following list ", user);
    try {
      const { data } = await axios.put('/user-follow', { _id: user._id });
      console.log('handle follow response => ', data);
      // update local storage, update user, keep token
      // let auth = JSON.parse(localStorage.getItem('auth'));
      // auth.user = data;
      // localStorage.setItem('auth', JSON.stringify(auth));
      // // update context
      // setState({ ...state, user: data });
      // // update people state
      // let filtered = people.filter((p) => p._id !== user._id);
      // setPeople(filtered);
      // // rerender the posts in newsfeed
      // newsFeed();
      // toast.success(`Following ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5">
          <div className="col text-center">
            <h1>News Feed</h1>
          </div>
        </div>
      </div>
      <div className="row py-3">
        <div className="col-md-8">
          <PostForm
            content={content}
            setContent={setContent}
            postSubmit={postSubmit}
            handleImage={handleImage}
            uploading={uploading}
            image={image}
          />
          <br />
          <PostList posts={posts} handleDelete={handleDelete} />
        </div>

        {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}
        <div className="col-md-4">
          {/* <pre>{JSON.stringify(people, null, 4)}</pre> */}
          <People people={people} handleFollow={handleFollow} />
        </div>
      </div>
    </UserRoute>
  );
}
