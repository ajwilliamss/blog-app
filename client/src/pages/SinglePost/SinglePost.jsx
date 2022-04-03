import Sidebar from "../../components/Sidebar/Sidebar";
import Post from "../../components/Post/Post";
import "./SinglePost.css";

const SinglePost = () => {
  return (
    <section className="single">
      <Post />
      <Sidebar />
    </section>
  );
};

export default SinglePost;
